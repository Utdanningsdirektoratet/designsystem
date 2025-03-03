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

import { expect, userEvent, within } from 'storybook/test';
import { Button } from '@udir-design/react/alpha';

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tab1 = canvas.getByRole('tab', { name: /tab 1/i });
    const tab2 = canvas.getByRole('tab', { name: /tab 2/i });
    const tab3 = canvas.getByRole('tab', { name: /tab 3/i });

    await step(
      'Default tab "Tab 1" is active and shows "content 1"',
      async () => {
        expect(tab1).toHaveAttribute('aria-selected', 'true');
        const panel1 = canvas.getByText(/content 1/i);
        expect(panel1).toBeVisible();
        const panel2 = canvas.queryByText(/content 2/i);
        expect(panel2).not.toBeInTheDocument();
        const panel3 = canvas.queryByText(/content 3/i);
        expect(panel3).not.toBeInTheDocument();
      },
    );

    await step(
      'Clicking tabs changes the active tab and displays the corresponding content',
      async () => {
        await userEvent.click(tab2);
        expect(tab2).toHaveAttribute('aria-selected', 'true');

        const panel2 = canvas.getByText(/content 2/i);
        expect(panel2).toBeVisible();

        await userEvent.click(tab3);
        expect(tab3).toHaveAttribute('aria-selected', 'true');

        const panel3 = canvas.getByText(/content 3/i);
        expect(panel3).toBeVisible();

        await userEvent.click(tab1);
        expect(tab1).toHaveAttribute('aria-selected', 'true');

        const panel1 = canvas.getByText(/content 1/i);
        expect(panel1).toBeVisible();
      },
    );

    await step('Can navigate tabs with the keyboard', async () => {
      expect(tab1).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(tab2).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(tab3).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(tab1).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(tab3).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(tab2).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(tab1).toHaveFocus();
    });
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
