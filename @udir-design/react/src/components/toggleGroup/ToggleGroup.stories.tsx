import type { Meta, StoryObj } from '@storybook/react';
import { Button, Divider, Paragraph, ToggleGroup, Tooltip } from '../alpha';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArchiveIcon,
  DocPencilIcon,
  EnvelopeClosedIcon,
  PaperplaneIcon,
} from '@navikt/aksel-icons';
import { useState } from 'react';
import { expect, fn, userEvent, within } from '@storybook/test';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Preview: Story = {
  args: {
    defaultValue: 'innboks',
    onChange: fn(),
    children: [
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>,
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>,
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>,
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>,
    ],
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const innboksButton = canvas.getByRole('radio', { name: /innboks/i });
    const utkastButton = canvas.getByRole('radio', { name: /utkast/i });
    const arkivButton = canvas.getByRole('radio', { name: /arkiv/i });

    await step('Default selection is "Innboks"', async () => {
      expect(innboksButton).toHaveAttribute('aria-checked', 'true');
    });

    await step('Only one ToggleGroup item is active initially', async () => {
      const buttons = canvas.getAllByRole('radio');
      const activeButtons = buttons.filter(
        (btn) => btn.getAttribute('aria-checked') === 'true'
      );
      expect(activeButtons).toHaveLength(1);
    });

    await step('User can navigate with arrow keys', async () => {
      await userEvent.tab();
      expect(innboksButton).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(utkastButton).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(arkivButton).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(utkastButton).toHaveFocus();
    });

    await step(
      'Clicking a different option updates the active state and calls onChange',
      async () => {
        expect(utkastButton).toHaveAttribute('aria-checked', 'false');
        await userEvent.click(utkastButton);
        expect(args.onChange).toHaveBeenCalledWith('utkast');
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
        expect(innboksButton).toHaveAttribute('aria-checked', 'false');
      }
    );

    await step(
      'Clicking an already active option keeps it active',
      async () => {
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
        await userEvent.click(utkastButton);
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
      }
    );
  },
};

export const OnlyIcons: Story = {
  args: {
    defaultValue: 'option-1',
    'data-color': 'accent',
    children: [
      <Tooltip content="Venstrestilt">
        <ToggleGroup.Item value="option-1" icon>
          <AlignLeftIcon title="AlignLeftIcon" />
        </ToggleGroup.Item>
      </Tooltip>,
      <Tooltip content="Midtstilt">
        <ToggleGroup.Item value="option-2" icon>
          <AlignCenterIcon title="AlignCenterIcon" />
        </ToggleGroup.Item>
      </Tooltip>,
      <Tooltip content="Høyrestilt">
        <ToggleGroup.Item value="option-3" icon>
          <AlignRightIcon title="AlignRightIcon" />
        </ToggleGroup.Item>
      </Tooltip>,
    ],
  },
};

export const Kontrollert: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>('utkast');
    return (
      <>
        <ToggleGroup value={value} onChange={setValue} {...args}>
          <ToggleGroup.Item value="innboks">
            <EnvelopeClosedIcon aria-hidden />
            Innboks
          </ToggleGroup.Item>
          <ToggleGroup.Item value="utkast">
            <DocPencilIcon aria-hidden />
            Utkast
          </ToggleGroup.Item>
          <ToggleGroup.Item value="arkiv">
            <ArchiveIcon aria-hidden />
            Arkiv
          </ToggleGroup.Item>
          <ToggleGroup.Item value="sendt">
            <PaperplaneIcon aria-hidden />
            Sendt
          </ToggleGroup.Item>
        </ToggleGroup>
        <Divider />
        <Paragraph>Du har valgt: {value}</Paragraph>
        <Button data-size="sm" onClick={() => setValue('arkiv')}>
          Velg Arkiv
        </Button>
      </>
    );
  },
};
