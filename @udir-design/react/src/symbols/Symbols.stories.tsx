import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Symbols from '@udir-design/symbols';
import type { AnalyseFillSymbol } from '@udir-design/symbols';

export default {
  title: 'iconsandsymbols/Symboler',
  tags: ['!autodocs'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    html: { disable: true },
  },
} as Meta<typeof AnalyseFillSymbol>;

type Story = StoryObj<typeof AnalyseFillSymbol>;

type Symbol = typeof AnalyseFillSymbol;
const typedSymbols = Symbols as Record<string, Symbol>;

export const AllSymbols: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Object.entries(typedSymbols).map(([key, Component]) => {
          return (
            <React.Fragment key={key}>
              <Component fontSize="3rem" aria-hidden />
            </React.Fragment>
          );
        })}
      </div>
    );
  },
};
