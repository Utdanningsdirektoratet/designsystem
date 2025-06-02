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
    children: [
      <Breadcrumbs.Link href="#" aria-label="Tilbake til Nivå 3">
        Nivå 3
      </Breadcrumbs.Link>,
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 1</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 2</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 3</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 4</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>,
    ],
  },
  play: async ({ canvasElement, step, globals }) => {
    const canvas = within(canvasElement);
    const breadcrumbs = canvas.getByLabelText('Du er her:');

    await step('Element with breadcrumbs role should exist', async () => {
      await expect(breadcrumbs).toBeTruthy();
    });

    await step('Link has the correct text and href', async () => {
      const link =
        canvas.queryByRole('link', { name: /nivå 1/i }) ||
        canvas.queryByRole('link', { name: /nivå 3/i });
      await expect(link).toHaveAttribute('href', '#');
    });

    // Return early if viewport is iPhone 6 (no list on mobile)
    if (globals.viewport.value === 'iphone6') return;

    const list = canvas.getByRole('list');

    await step('Element with list role should exist', async () => {
      await expect(list).toBeTruthy();
    });

    await step('List should have expected number of items', async () => {
      await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
    });
  },
};

export const ListOnly: Story = {
  args: {
    'aria-label': 'Du er her:',
    children: [
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 1</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 2</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 3</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 4</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>,
    ],
  },
};

export const BackOnly: Story = {
  args: {
    children: [
      <Breadcrumbs.Link href="#" aria-label="Tilbake til Nivå 3">
        Nivå 3
      </Breadcrumbs.Link>,
    ],
  },
};

export const LongItems: Story = {
  args: {
    children: [
      <Breadcrumbs.Link
        href="#"
        aria-label="Tilbake til helsesertifikat for sjømat"
      >
        Slik søker du om helsesertifikat for sjømat
      </Breadcrumbs.Link>,
      <Breadcrumbs.List aria-label="Du er her:">
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Hjem</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Eksport til land utenfor EU/EØS
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Eksport av mat og drikke</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Eksport av fisk og sjømat
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Veiledning om helsesertifikat for sjømat
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Slik søker du om helsesertifikat for sjømat
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">
            Slik søker du om helsesertifikat i ny eksportløsning
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>,
    ],
  },
};

export const MobileViewport: Story = {
  ...Preview,
  globals: {
    viewport: { value: 'iphone6' },
  },
};
