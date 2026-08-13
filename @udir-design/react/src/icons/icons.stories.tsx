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
      <>
        <style>
          {`
.icons-outline-icon-grid{
  display: flex;
  flex-wrap: wrap;
}`}
        </style>
        <div className="icons-outline-icon-grid">
          {Object.entries(typedIcons).map(([key, Component]) => {
            return (
              !key.includes('Fill') && (
                <React.Fragment key={key}>
                  <Component
                    aria-label={key}
                    height="3rem"
                    width="3rem"
                    aria-hidden
                  />
                </React.Fragment>
              )
            );
          })}
        </div>
      </>
    );
  },
});

export const FillIcons = meta.story({
  render: () => {
    return (
      <>
        <style>
          {`
.icons-fill-icons-grid{
  display: flex;
  flex-wrap: wrap;
  background: var(--a-gray-900);
}`}
        </style>
        <div className="icons-fill-icons-grid">
          {Object.entries(typedIcons).map(([key, Component]) => {
            return (
              key.includes('Fill') && (
                <React.Fragment key={key}>
                  <Component
                    aria-label={key}
                    height="3rem"
                    width="3rem"
                    aria-hidden
                  />
                </React.Fragment>
              )
            );
          })}
        </div>
      </>
    );
  },
});
