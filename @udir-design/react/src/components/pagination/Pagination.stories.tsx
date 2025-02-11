import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Preview: Story = {
  args: {
    children: (
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button aria-label="Forrige side" variant="tertiary">
            Forrige
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 1" variant="tertiary">
            1
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 2" variant="tertiary">
            2
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 3" variant="tertiary">
            3
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button
            aria-current="page"
            aria-label="Side 4"
            variant="primary"
          >
            4
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 5" variant="tertiary">
            5
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item />
        <Pagination.Item>
          <Pagination.Button aria-label="Side 10" variant="tertiary">
            10
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Neste side" variant="tertiary">
            Neste
          </Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    ),
  },
};
