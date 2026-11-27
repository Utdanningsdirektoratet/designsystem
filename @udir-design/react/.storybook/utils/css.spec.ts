import { describe, expect, it } from 'vitest';
import { css } from './css';

describe('css', () => {
  it('removes the indentation and blank lines that oxfmt adds around the CSS', () => {
    expect(css`
      .example {
        display: flex;
      }

      .example > * {
        flex: 1;
      }
    `).toBe('.example {\n  display: flex;\n}\n\n.example > * {\n  flex: 1;\n}');
  });

  it('keeps CSS escapes and interpolated values as written', () => {
    const gap = 'var(--ds-size-2)';
    expect(css`
      .quote::before {
        content: '\201C';
        gap: ${gap};
      }
    `).toBe(
      ".quote::before {\n  content: '\\201C';\n  gap: var(--ds-size-2);\n}",
    );
  });
});
