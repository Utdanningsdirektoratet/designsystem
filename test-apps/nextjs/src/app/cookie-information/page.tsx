'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Heading,
  Paragraph,
  Prose,
} from '@udir-design/react/alpha';

type DiagnosticEvent = {
  type: string;
  at: number;
  readyState: DocumentReadyState;
  dialogId?: string;
  optionalCategories?: number;
};

type CookieInformationApi = {
  getConsentGivenFor: (category: string) => boolean;
};

declare global {
  interface Window {
    CookieInformation?: CookieInformationApi;
    __cookieInformationDiagnosticsLoaded?: boolean;
    __cookieInformationDiagnosticEvents?: DiagnosticEvent[];
    __cookieInformationOptionalResourceLoaded?: boolean;
    renewCookieConsent?: () => void;
    __recordCookieInformationDiagnosticEvent?: (
      type: string,
      details?: Partial<DiagnosticEvent>,
    ) => void;
  }
}

const categories = [
  'cookie_cat_functional',
  'cookie_cat_statistic',
  'cookie_cat_marketing',
] as const;

export default function CookieInformationIntegration() {
  const [events, setEvents] = useState<DiagnosticEvent[]>([]);
  const [consent, setConsent] = useState<Record<string, boolean | null>>({});
  const [optionalResourceLoaded, setOptionalResourceLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setEvents([...(window.__cookieInformationDiagnosticEvents ?? [])]);
      setOptionalResourceLoaded(
        window.__cookieInformationOptionalResourceLoaded ?? false,
      );
      setConsent(
        Object.fromEntries(
          categories.map((category) => [
            category,
            window.CookieInformation?.getConsentGivenFor(category) ?? null,
          ]),
        ),
      );
    };
    const loadCookieInformation = () => {
      if (document.getElementById('CookieConsent')) return;

      const consentScript = document.createElement('script');
      consentScript.id = 'CookieConsent';
      consentScript.src = 'https://policy.app.cookieinformation.com/uc.js';
      consentScript.dataset.culture = 'NB';
      consentScript.dataset.gcmVersion = '2.0';
      document.head.append(consentScript);
    };

    window.addEventListener('CookieInformationDiagnosticsEvent', refresh);
    window.addEventListener('CookieInformationConsentGiven', refresh);
    window.addEventListener('CookieInformationOptionalResourceLoaded', refresh);
    refresh();

    const diagnosticsScript = document.createElement('script');
    diagnosticsScript.id = 'cookie-information-diagnostics';
    diagnosticsScript.src = '/testapp/cookie-information-diagnostics.js';
    diagnosticsScript.addEventListener('load', loadCookieInformation, {
      once: true,
    });
    document.head.append(diagnosticsScript);

    return () => {
      window.removeEventListener('CookieInformationDiagnosticsEvent', refresh);
      window.removeEventListener('CookieInformationConsentGiven', refresh);
      window.removeEventListener(
        'CookieInformationOptionalResourceLoaded',
        refresh,
      );
      diagnosticsScript.removeEventListener('load', loadCookieInformation);
      diagnosticsScript.remove();
    };
  }, []);

  return (
    <>
      <script
        data-category-consent="cookie_cat_statistic"
        data-consent-src="/testapp/cookie-information-optional-resource.js"
      />
      <Prose style={{ marginInline: 'var(--ds-size-2)' }}>
        <Heading level={1}>Cookie Information integration test</Heading>
        <Paragraph>
          This permanent integration page loads the real Cookie Information
          script and records when the template appears, when a dialog opens, and
          when Cookie Information reports a decision.
        </Paragraph>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-size-3)',
          }}
        >
          <Button onClick={() => window.renewCookieConsent?.()}>
            Open consent dialog
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              window.__cookieInformationDiagnosticEvents?.splice(0);
              window.__recordCookieInformationDiagnosticEvent?.('log-cleared');
            }}
          >
            Clear event log
          </Button>
        </div>

        <Heading level={2}>Current category decisions</Heading>
        <pre>{JSON.stringify(consent, null, 2)}</pre>

        <Heading level={2}>Optional resource probe</Heading>
        <Paragraph>
          Loaded after statistics consent:{' '}
          {optionalResourceLoaded ? 'yes' : 'no'}
        </Paragraph>

        <Heading level={2}>Blocked feature example</Heading>
        <Alert
          className="consent-placeholder"
          data-category="cookie_cat_functional"
          data-color="info"
        >
          <Alert.Heading level={3}>
            Functional cookies are required to show this video
          </Alert.Heading>
          <Paragraph>
            The placeholder should disappear after functional cookies are
            accepted and reappear after they are rejected.
          </Paragraph>
          <Button onClick={() => window.renewCookieConsent?.()}>
            Change consent
          </Button>
        </Alert>

        <Heading level={2}>Event log</Heading>
        <pre>{JSON.stringify(events, null, 2)}</pre>
      </Prose>
    </>
  );
}
