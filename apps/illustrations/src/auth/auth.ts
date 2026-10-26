import {
  AuthError,
  CacheLookupPolicy,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';
import type { AccountInfo } from '@azure/msal-browser';
import type { StorageConfig } from '../storage';

export interface AuthConfig extends StorageConfig {
  clientId: string;
  tenantId: string;
}

// Azure Storage's delegated permission; the user's own role assignments decide access.
const scopes = ['https://storage.azure.com/user_impersonation'];

function required(name: string, value: unknown): string {
  if (typeof value !== 'string' || !value)
    throw new Error(`${name} must be set when VITE_AUTH_CLIENT_ID is set.`);
  return value;
}

/** Login is on only for builds that set VITE_AUTH_CLIENT_ID; development reads local files. */
export function readAuthConfig(
  env: Record<string, unknown> = import.meta.env,
): AuthConfig | undefined {
  if (!env.VITE_AUTH_CLIENT_ID) return undefined;
  return {
    clientId: required('VITE_AUTH_CLIENT_ID', env.VITE_AUTH_CLIENT_ID),
    tenantId: required('VITE_AUTH_TENANT_ID', env.VITE_AUTH_TENANT_ID),
    storageAccount: required('VITE_STORAGE_ACCOUNT', env.VITE_STORAGE_ACCOUNT),
    container: required('VITE_STORAGE_CONTAINER', env.VITE_STORAGE_CONTAINER),
    version: required('VITE_ASSET_VERSION', env.VITE_ASSET_VERSION),
  };
}

export function createSession(config: AuthConfig) {
  const msal = new PublicClientApplication({
    auth: {
      clientId: config.clientId,
      authority: `https://login.microsoftonline.com/${config.tenantId}`,
      redirectUri: `${window.location.origin}${import.meta.env.BASE_URL}`,
    },
    // localStorage keeps new tabs and restarts signed in; sessionStorage is per tab.
    cache: { cacheLocation: 'localStorage' },
  });

  let pending: Promise<string> | undefined;

  async function acquire(account: AccountInfo, forceRefresh: boolean) {
    try {
      // No hidden-iframe fallback (it needs a redirect bridge page); an expired refresh token fails fast.
      return (
        await msal.acquireTokenSilent({
          scopes,
          account,
          forceRefresh,
          cacheLookupPolicy: CacheLookupPolicy.AccessTokenAndRefreshToken,
        })
      ).accessToken;
    } catch (error) {
      if (!(error instanceof InteractionRequiredAuthError)) throw error;
      // The refresh token lives 24 hours; sign in again and never resolve while the page navigates away.
      await msal.acquireTokenRedirect({ scopes, account });
      return new Promise<never>(() => {});
    }
  }

  // Parallel requests share one call, so at most one redirect starts.
  function getToken(forceRefresh = false) {
    const account = msal.getActiveAccount();
    if (!account) return Promise.reject(new Error('Not signed in.'));
    pending ??= acquire(account, forceRefresh).finally(() => {
      pending = undefined;
    });
    return pending;
  }

  return {
    /** Completes a pending redirect login and returns the signed-in account, if any. */
    async init() {
      await msal.initialize();
      const result = await msal.handleRedirectPromise();
      const account = result?.account ?? msal.getAllAccounts()[0];
      if (!account) return null;
      msal.setActiveAccount(account);
      try {
        // An expired refresh token redirects here, before the app renders.
        await getToken();
      } catch (error) {
        if (!(error instanceof AuthError)) throw error;
        // A damaged cache is unrecoverable silently; start over with a fresh login.
        await msal.clearCache();
        return null;
      }
      return account;
    },
    login: () => msal.loginRedirect({ scopes }),
    getToken,
  };
}

export type Session = ReturnType<typeof createSession>;
