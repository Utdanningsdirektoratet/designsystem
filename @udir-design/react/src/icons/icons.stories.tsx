import React from 'react';
import * as Icons from '@udir-design/icons';
import type { AirplaneIcon } from '@udir-design/icons';
import preview from '.storybook/preview';

const meta = preview.meta({
  title: 'iconsandsymbols/Ikoner',
  tags: ['!autodocs'],
  parameters: {
    componentOrigin: {
      originator: 'nav',
    },
    html: { disable: true },
  },
});

type Icon = typeof AirplaneIcon;
const typedIcons = Icons as Record<string, Icon>;

export const OutlineIcons = meta.story({
  render: () => {
    return (
      <div className="icons">
        {Object.entries(typedIcons).map(([key, Component]) => {
          return (
            !key.includes('Fill') && (
              <React.Fragment key={key}>
                <Component
                  height="3rem"
                  width="3rem"
                  aria-hidden
                  className="icon-color"
                />
              </React.Fragment>
            )
          );
        })}
        <style>
          {`
          .icons{
            display: flex;
            flex-wrap: wrap;
          }
          `}
        </style>
      </div>
    );
  },
});

export const FillIcons = meta.story({
  render: () => {
    return (
      <div className="icons">
        {Object.entries(typedIcons).map(([key, Component]) => {
          return (
            key.includes('Fill') && (
              <React.Fragment key={key}>
                <Component fontSize="3rem" aria-hidden className="icon-color" />
              </React.Fragment>
            )
          );
        })}
        <style>
          {`
          .icons{
            display: flex;
            flex-wrap: wrap;
            background: var(--a-gray-900);
          }
          .icon-color{
            color: var(--a-icon-on-inverted);
          }
          `}
        </style>
      </div>
    );
  },
});
