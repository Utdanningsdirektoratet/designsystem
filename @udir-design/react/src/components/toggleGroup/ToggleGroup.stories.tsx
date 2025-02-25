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

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Preview: Story = {
  args: {
    defaultValue: 'innboks',
    children: [
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>,
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>,
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>,
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>,
    ],
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
