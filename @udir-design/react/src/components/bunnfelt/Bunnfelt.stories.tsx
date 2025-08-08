import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bunnfelt, Link } from '@udir-design/react/alpha';

const meta: Meta<typeof Bunnfelt> = {
  component: Bunnfelt,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Bunnfelt>;

export const Preview: Story = {
  args: {
    'data-color': 'neutral',
  },
  render: () => (
    <Bunnfelt>
      <Bunnfelt.List>
        <Bunnfelt.Item>
          <Link href="https://www.udir.no/om-udir/personvernerklaring-udir/">
            Personvern
          </Link>
        </Bunnfelt.Item>
        <Bunnfelt.Item>
          <Link href="https://www.udir.no/">Informasjonskapsler</Link>
        </Bunnfelt.Item>
        <Bunnfelt.Item>
          <Link href="https://uustatus.no/nb/erklaringer/publisert/ce43e104-3893-45ac-90c8-45deb6f17624">
            Tilgjengelighet
          </Link>
        </Bunnfelt.Item>
      </Bunnfelt.List>
    </Bunnfelt>
  ),
};
