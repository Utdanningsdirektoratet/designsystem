import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';
import type { StorageConfig } from './storage';

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

  return {
    /** Completes a pending redirect login and returns the signed-in account, if any. */
    async init() {
      await msal.initialize();
      const result = await msal.handleRedirectPromise();
      const account = result?.account ?? msal.getAllAccounts()[0];
      if (account) msal.setActiveAccount(account);
      return account ?? null;
    },
    login: () => msal.loginRedirect({ scopes }),
    logout: () => msal.logoutRedirect(),
    async getToken() {
      const account = msal.getActiveAccount();
      if (!account) throw new Error('Not signed in.');
      try {
        return (await msal.acquireTokenSilent({ scopes, account })).accessToken;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError)
          await msal.acquireTokenRedirect({ scopes, account });
        throw error;
      }
    },
  };
}

export type Session = ReturnType<typeof createSession>;
