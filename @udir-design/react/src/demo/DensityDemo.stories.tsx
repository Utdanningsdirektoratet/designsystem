import './demoSizing.css';
import '../components/input/input.css';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { DensityDemo } from '../../demo-pages/density-demo/DensityDemo';
import { demoParameters } from './demoParameters';

const meta = preview.meta({
  title: 'demo/Density Demo',
  component: DensityDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-role',
            matches: (element) => !(element instanceof HTMLInputElement),
          },
        ],
      },
    },
  },
});

export const DensityStory = meta.story({
  args: {
    'data-color-scheme': 'light',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const densitySwitch = canvas.getByRole('switch', {
      name: 'Kompakt visning',
    });
    const region = canvas.getByRole('region', { name: 'Ansattoversikt' });
    const table = canvas.getByRole('table');
    const headerCell = canvas.getByRole('columnheader', { name: 'Navn' });
    const searchInput = canvas.getByRole('searchbox', {
      name: 'Søk etter ansatte',
    });
    const searchButton = canvas.getByRole('button', {
      name: 'Søk etter ansatte',
    });
    const select = canvas.getByRole('combobox', {
      name: 'Rolle',
    });
    const suggestionInput = canvas.getByRole('combobox', {
      name: 'Avdelinger',
    });
    const toggleGroupItem = canvas.getByText('Alle', { selector: 'label' });
    const tab = canvas.getByRole('tab', { name: 'Ansatte' });
    const rowAction = canvas.getByRole('button', {
      name: 'Åpne Rita Nordmann',
    });
    const defaultToggleGroupHeight =
      toggleGroupItem.getBoundingClientRect().height;
    const defaultTabHeight = tab.getBoundingClientRect().height;
    let defaultSuggestionOptionPadding = 0;

    await step('Starts with default density', async () => {
      await expect(densitySwitch).not.toBeChecked();
      await expect(region).toHaveAttribute('data-density', 'default');
      await expect(getComputedStyle(table).fontSize).toBe('18px');
      await expect(getComputedStyle(headerCell).paddingBlockStart).toBe('8px');
      await expect(searchInput.getBoundingClientRect().height).toBe(48);
      await expect(searchButton.getBoundingClientRect().height).toBe(48);
      await expect(select.getBoundingClientRect().height).toBe(48);
      await expect(suggestionInput.getBoundingClientRect().height).toBe(48);
      await expect(rowAction.getBoundingClientRect().height).toBe(48);

      await userEvent.click(suggestionInput);
      const suggestionOption = await canvas.findByRole('option', {
        name: 'Ledelse',
      });
      defaultSuggestionOptionPadding = Number.parseFloat(
        getComputedStyle(suggestionOption).paddingBlockStart,
      );
      await userEvent.keyboard('{Escape}');
    });

    await step(
      'Switches the complete workspace to compact density',
      async () => {
        await userEvent.click(densitySwitch);
        await expect(densitySwitch).toBeChecked();
        await expect(region).toHaveAttribute('data-density', 'compact');
        await expect(getComputedStyle(table).fontSize).toBe('18px');
        await expect(getComputedStyle(headerCell).paddingBlockStart).toBe(
          '4px',
        );

        await userEvent.click(suggestionInput);
        const suggestionOption = await canvas.findByRole('option', {
          name: 'Realfag',
        });
        await expect(
          Number.parseFloat(
            getComputedStyle(suggestionOption).paddingBlockStart,
          ),
        ).toBeLessThan(defaultSuggestionOptionPadding);
        await userEvent.keyboard('{Escape}');

        for (const control of [
          searchInput,
          searchButton,
          select,
          suggestionInput,
          toggleGroupItem,
          tab,
          rowAction,
        ]) {
          const { width, height } = control.getBoundingClientRect();
          await expect(width).toBeGreaterThanOrEqual(24);
          await expect(height).toBeGreaterThanOrEqual(24);
        }
      },
    );

    await step('Restores default density', async () => {
      await userEvent.click(densitySwitch);
      await expect(densitySwitch).not.toBeChecked();
      await expect(region).toHaveAttribute('data-density', 'default');
      await expect(searchInput.getBoundingClientRect().height).toBe(48);
      await expect(searchButton.getBoundingClientRect().height).toBe(48);
      await expect(select.getBoundingClientRect().height).toBe(48);
      await expect(suggestionInput.getBoundingClientRect().height).toBe(48);
      await expect(rowAction.getBoundingClientRect().height).toBe(48);
      await expect(toggleGroupItem.getBoundingClientRect().height).toBe(
        defaultToggleGroupHeight,
      );
      await expect(tab.getBoundingClientRect().height).toBe(defaultTabHeight);
    });
  },
});
