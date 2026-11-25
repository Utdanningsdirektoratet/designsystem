import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
/*
 * Checks that server-rendered HTML works under a strict Content Security Policy (`style-src`
 * without `'unsafe-inline'`). Such a policy blocks `style` attributes and `<style>` elements in
 * the HTML, including those in declarative shadow roots, but not styles set with CSSOM after
 * hydration (`useStyleProperties`). `test-apps/nextjs/e2e/csp.spec.ts` checks the same
 * components in browsers, under a real policy.
 */
import * as Symbols from '@udir-design/symbols';
import { cspDemoComponents } from '../demo-pages/csp-demo/CspDemo';
import { cspDemoProps } from '../demo-pages/csp-demo/cspDemoProps';
// oxlint-disable-next-line no-restricted-imports -- The test covers every export of the library
import * as Udir from './alpha';

type ComponentName = Exclude<keyof typeof Udir, `use${string}`>;

/** Markup that a strict `style-src` blocks */
const violationPatterns = [/\sstyle="[^"]*"/g, /<style[\s>][\s\S]*?<\/style>/g];

/**
 * Inline styles that are allowed, by component. Keep this list short: every entry is a style that
 * pages with a strict CSP lose.
 */
const allowedViolations: Partial<Record<ComponentName, string[]>> = {};

const findViolations = (html: string): string[] =>
  violationPatterns.flatMap((pattern) =>
    Array.from(html.matchAll(pattern), ([match]) => match.trim()),
  );

describe('server-rendered HTML under a strict CSP', () => {
  const variants = Object.entries(cspDemoProps);

  it('covers every component that the library exports', () => {
    const components: Record<ComponentName, ReactElement> = cspDemoComponents(
      cspDemoProps.initial,
    );
    const exported = Object.keys(Udir).filter(
      (name) => !/^use[A-Z]/.test(name),
    );
    expect(Object.keys(components).toSorted()).toEqual(exported.toSorted());
  });

  describe.for(variants)('with %s props', ([, props]) => {
    it.for(Object.entries(cspDemoComponents(props)))(
      '%s has no inline styles',
      ([name, element]) => {
        const violations = findViolations(renderToString(element));
        expect(violations).toEqual(
          allowedViolations[name as ComponentName] ?? [],
        );
      },
    );
  });

  // Symbols size themselves with an attribute, unless `width` or `height` is given
  it.for(Object.entries(Symbols))('%s has no inline styles', ([, Symbol]) => {
    const html = renderToString(
      <>
        <Symbol />
        <Symbol size="4rem" />
        <Symbol width={64} />
      </>,
    );
    expect(findViolations(html)).toEqual([]);
  });
});
