import React from 'react';
import * as Symbols from '@udir-design/symbols';
import type { AnalyseFillSymbol } from '@udir-design/symbols';
import preview from '.storybook/preview';

const meta = preview.meta({
  title: 'iconsandsymbols/Symboler',
  tags: ['!autodocs'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    html: { disable: true },
  },
});

type Symbol = typeof AnalyseFillSymbol;
const typedSymbols = Symbols as Record<string, Symbol>;

export const AllSymbols = meta.story({
  render: () => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Object.entries(typedSymbols).map(([key, Component]) => {
          return (
            <React.Fragment key={key}>
              <Component aria-hidden />
            </React.Fragment>
          );
        })}
      </div>
    );
  },
});
