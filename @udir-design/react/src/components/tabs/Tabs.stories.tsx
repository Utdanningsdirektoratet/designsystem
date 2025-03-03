import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import {
  AirplaneIcon,
  BackpackIcon,
  BellIcon,
  DogIcon,
  NewspaperIcon,
} from '@navikt/aksel-icons';
import { useState } from 'react';
import { Button } from '../alpha';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Preview: Story = {
  args: {
    defaultValue: 'value1',
    children: [
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>,
      <Tabs.Panel value="value1">content 1</Tabs.Panel>,
      <Tabs.Panel value="value2">content 2</Tabs.Panel>,
      <Tabs.Panel value="value3">content 3</Tabs.Panel>,
    ],
  },
};

export const IconsOnly: Story = {
  args: {
    defaultValue: 'value1',
    children: [
      <Tabs.List>
        <Tabs.Tab value="value1">
          <AirplaneIcon title="Airplane" />
        </Tabs.Tab>
        <Tabs.Tab value="value2">
          <NewspaperIcon title="Newspaper" />
        </Tabs.Tab>
        <Tabs.Tab value="value3">
          <DogIcon title="Dog" />
        </Tabs.Tab>
      </Tabs.List>,
      <Tabs.Panel value="value1">content 1</Tabs.Panel>,
      <Tabs.Panel value="value2">content 2</Tabs.Panel>,
      <Tabs.Panel value="value3">content 3</Tabs.Panel>,
    ],
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState('value1');

    return (
      <>
        <Button data-size="sm" onClick={() => setValue('value3')}>
          Choose Tab 3
        </Button>
        <br />
        <Tabs value={value} onChange={setValue}>
          <Tabs.List>
            <Tabs.Tab value="value1">
              <BellIcon aria-hidden />
              Tab 1
            </Tabs.Tab>
            <Tabs.Tab value="value2">
              <NewspaperIcon aria-hidden />
              Tab 2
            </Tabs.Tab>
            <Tabs.Tab value="value3">
              <BackpackIcon aria-hidden />
              Tab 3
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="value1">content 1</Tabs.Panel>
          <Tabs.Panel value="value2">content 2</Tabs.Panel>
          <Tabs.Panel value="value3">content 3</Tabs.Panel>
        </Tabs>
      </>
    );
  },
};
