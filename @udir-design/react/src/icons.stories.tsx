import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Icons from '@udir-design/icons';
import { AirplaneIcon } from '@udir-design/icons';

export default {
  title: 'Ikoner',
  parameters: { html: { disable: true } },
} as Meta<typeof AirplaneIcon>;

type Story = StoryObj<typeof AirplaneIcon>;

export const OutlineIcons: Story = {
  render: () => {
    return (
      <div className="icons">
        {Object.entries(Icons).map(
          ([key, Value]) =>
            !key.includes('Fill') && (
              <React.Fragment key={key}>
                <Value
                  fontSize="3rem"
                  aria-hidden
                  title={key}
                  className="icon-color"
                />
              </React.Fragment>
            ),
        )}
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
};

export const FillIcons: Story = {
  render: () => {
    return (
      <div className="icons">
        {Object.entries(Icons).map(
          ([key, Value]) =>
            key.includes('Fill') && (
              <React.Fragment key={key}>
                <Value
                  fontSize="3rem"
                  aria-hidden
                  title={key}
                  className="icon-color"
                />
              </React.Fragment>
            ),
        )}
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
};
