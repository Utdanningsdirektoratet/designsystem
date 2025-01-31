import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

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
  parameters: {
    viewport: {
      defaultViewport: '375px', // Large mobile default viewport
    },
  },
};
