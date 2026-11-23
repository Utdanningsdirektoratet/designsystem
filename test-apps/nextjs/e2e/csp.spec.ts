import type { Page } from 'playwright/test';
import { expect, test } from 'playwright/test';
import type { CspDemoProps } from '@udir-design/demos/csp-demo/cspDemoProps';
import {
  cspDemoProps,
  progressMax,
} from '@udir-design/demos/csp-demo/cspDemoProps';
import { basePath, routes } from './routes';

/*
 * Checks that the library works under a strict Content Security Policy (`style-src` without
 * `'unsafe-inline'`), in server-rendered, hydrated, updated and client-rendered pages. The test
 * adds the policy itself, so the app runs unchanged. Only `style-src` violations fail the test:
 * the App Router needs inline scripts, and third-party scripts such as Cookie Information's load
 * frames that the policy doesn't allow.
 */

const policy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://policy.app.cookieinformation.com",
  // altinncdn.no serves the Inter font that the layout loads
  "style-src 'self' https://altinncdn.no 'report-sample'",
  "img-src 'self' data:",
  "font-src 'self' data: https://altinncdn.no",
  'connect-src *',
].join('; ');

type CspViolation = {
  directive: string;
  blockedURI: string;
  sample: string;
  element: string;
};

declare global {
  interface Window {
    cspViolations?: CspViolation[];
  }
}

/**
 * Serves the test app's documents with the policy, and records violations from before the first
 * page script runs. Returns a function that reads the violations so far.
 */
async function enforceCsp(page: Page) {
  await page.route(
    (url) => url.pathname.startsWith(basePath),
    async (route) => {
      if (route.request().resourceType() !== 'document') {
        return route.continue();
      }
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: {
          ...response.headers(),
          'content-security-policy': policy,
        },
      });
    },
  );
  await page.addInitScript(() => {
    const violations: CspViolation[] = [];
    window.cspViolations = violations;
    document.addEventListener('securitypolicyviolation', (event) => {
      const target = event.target;
      violations.push({
        directive: event.effectiveDirective,
        blockedURI: event.blockedURI,
        sample: event.sample,
        element:
          target instanceof Element
            ? target.outerHTML.slice(0, 200)
            : String(target),
      });
    });
  });

  return () =>
    page.evaluate(() => {
      // Violation events are dispatched in tasks of their own, so let those run first
      const { promise, resolve } = Promise.withResolvers<CspViolation[]>();
      setTimeout(() => resolve(window.cspViolations ?? []), 0);
      return promise;
    });
}

/** Fails on `style-src` violations, and lists the others in the report */
async function expectNoStyleViolations(
  readViolations: () => Promise<CspViolation[]>,
) {
  const violations = await readViolations();
  const otherViolations = violations.filter(
    (violation) => !violation.directive.startsWith('style-src'),
  );
  for (const violation of otherViolations) {
    test.info().annotations.push({
      type: 'Other CSP violation',
      description: JSON.stringify(violation),
    });
  }
  expect(
    violations.filter((violation) =>
      violation.directive.startsWith('style-src'),
    ),
  ).toEqual([]);
}

/** Checks styles that a strict CSP would block if they were set as inline styles */
async function expectPropStyles(page: Page, props: CspDemoProps) {
  await expect(
    page.getByTestId('csp-header').locator(':scope > div'),
  ).toHaveCSS('max-width', props.maxWidth);
  await expect(
    page.getByTestId('csp-footer').locator(':scope > div'),
  ).toHaveCSS('max-width', props.maxWidth);
  // Firefox lays the symbol out a fraction of a pixel wider
  await expect
    .poll(
      async () => (await page.getByTestId('csp-symbol').boundingBox())?.width,
    )
    .toBeCloseTo(parseFloat(props.size), 0);
  // The bar is the `::before` of `u-progress`, whose width changes with a transition
  await expect
    .poll(() =>
      page
        .locator('main u-progress')
        .evaluate(
          (progress) =>
            parseFloat(getComputedStyle(progress, '::before').width) /
            progress.clientWidth,
        ),
    )
    .toBeCloseTo(props.progressValue / progressMax, 1);
}

for (const [route, serverRendered] of [
  ['/csp', true],
  ['/csp/client', false],
] as const) {
  test(`${route} renders, hydrates and updates every component without inline styles`, async ({
    page,
  }) => {
    const readViolations = await enforceCsp(page);
    const response = await page.goto(`${basePath}${route}`);
    expect(response?.status()).toBe(200);
    // Make sure that the route renders where it claims to
    expect((await response?.text())?.includes('data-testid="csp-header"')).toBe(
      serverRendered,
    );

    await expectPropStyles(page, cspDemoProps.initial);

    const button = page.getByRole('button', { name: 'Endre props' });
    // A click before hydration does nothing, so retry it
    await expect(async () => {
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true', {
        timeout: 1_000,
      });
    }).toPass();
    await expectPropStyles(page, cspDemoProps.changed);

    await expectNoStyleViolations(readViolations);
  });
}

for (const route of routes) {
  test(`${route} has no inline styles`, async ({ page }) => {
    const readViolations = await enforceCsp(page);
    // Wait for what renders after hydration, such as Highcharts charts
    const response = await page.goto(`${basePath}${route}`, {
      waitUntil: 'networkidle',
    });
    expect(response?.status()).toBe(200);
    await expectNoStyleViolations(readViolations);
  });
}
