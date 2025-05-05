import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { expect, within } from 'storybook/test';

export default {
  component: Breadcrumbs,
  tags: ['alpha'],
} as Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Preview: Story = {
  args: {
    'aria-label': 'Du er her:',
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Link href="#" aria-label="Tilbake til Utdanningsløpet">
        Utdanningsløpet
      </Breadcrumbs.Link>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Forside</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Utdanningsløpet</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Grunnskole</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
  play: async ({ canvasElement, step, globals }) => {
    const canvas = within(canvasElement);
    const breadcrumbs = canvas.getByLabelText('Du er her:');

    await step('Element with breadcrumbs role should exist', async () => {
      await expect(breadcrumbs).toBeTruthy();
    });

    await step('Link has the correct text and href', async () => {
      const link =
        canvas.queryByRole('link', { name: /Forside/i }) ||
        canvas.queryByRole('link', { name: /Utdanningsløpet/i });
      await expect(link).toHaveAttribute('href', '#');
    });

    // Return early if viewport is iPhone 6 (no list on mobile)
    if (globals.viewport.value === 'iphone6') return;

    const list = canvas.getByRole('list');

    await step('Element with list role should exist', async () => {
      await expect(list).toBeTruthy();
    });

    await step('List should have expected number of items', async () => {
      await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    });
  },
};

export const ListOnly: Story = {
  args: {
    'aria-label': 'Du er her:',
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Forside</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Eksamen og prøver</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Eksamen</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Kartleggingsprøver</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};

export const BackOnly: Story = {
  args: {
    children: [
      <Breadcrumbs.Link href="#" aria-label="Tilbake til Eksamen">
        Eksamen
      </Breadcrumbs.Link>,
    ],
  },
};

export const LongItems: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Link
        href="#"
        aria-label="Tilbake til helsesertifikat for sjømat"
      >
        Slik søker du om å bli vurdert for videreutdanning
      </Breadcrumbs.Link>
      <Breadcrumbs.List aria-label="Du er her:">
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Forside</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Kvalitet og kompetanse</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Arbeid med kvalitet og kompetanse
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Videreutdanning</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Videreutdanning for lærere
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Slik søker du om å bli vurdert for videreutdanning
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};

export const MobileViewport: Story = {
  ...Preview,
  globals: {
    viewport: { value: 'iphone6' },
  },
};
