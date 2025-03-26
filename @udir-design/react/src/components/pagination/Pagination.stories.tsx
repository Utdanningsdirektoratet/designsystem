import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, usePagination, UsePaginationProps } from '../../alpha';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Preview: Story = {
  render: function Render(args) {
    const [page, setCurrentPage] = useState(4);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: page,
      totalPages: 10,
      showPages: 7,
      setCurrentPage,
    });

    return (
      <Pagination aria-label="Sidenavigering" {...args}>
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button aria-label="Forrige side" {...prevButtonProps}>
              Forrige
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === 'number' && (
                <Pagination.Button {...buttonProps} aria-label={`Side ${page}`}>
                  {page}
                </Pagination.Button>
              )}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Button aria-label="Neste side" {...nextButtonProps}>
              Neste
            </Pagination.Button>
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const pagination = canvas.getByRole('navigation');
    const prevButton = canvas.getByRole('button', { name: /forrige side/i });
    const nextButton = canvas.getByRole('button', { name: /neste side/i });

    await step('Pagination component is rendered', async () => {
      expect(pagination).toBeInTheDocument();
    });

    await step('Navigation buttons are rendered', async () => {
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    await step('Initial active page is 4', async () => {
      const activePageButton = canvas.getByRole('button', { name: /side 4/i });
      expect(activePageButton).toHaveAttribute('aria-current', 'page');
    });

    await step('Clicking "Neste side" changes active page to 5', async () => {
      await userEvent.click(nextButton);
      const activePageButton = canvas.getByRole('button', { name: /side 5/i });
      expect(activePageButton).toHaveAttribute('aria-current', 'page');
    });

    await step(
      'Clicking "Forrige side" changes active page back to 4',
      async () => {
        await userEvent.click(prevButton);
        const activePageButton = canvas.getByRole('button', {
          name: /side 4/i,
        });
        expect(activePageButton).toHaveAttribute('aria-current', 'page');
      },
    );
  },
};

export const WithAnchor: StoryObj<UsePaginationProps> = {
  args: {
    currentPage: 2,
    onChange: console.log, // Open console to see this event
    totalPages: 10,
    showPages: 7,
  },
  render: function Render(args) {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      ...args,
      currentPage,
      setCurrentPage: (page) => {
        setCurrentPage(page);
      },
    });

    return (
      <Pagination aria-label="Sidenavigering">
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button
              asChild
              aria-label="Forrige side"
              {...prevButtonProps}
            >
              <a href="#forrige-side">Forrige</a>
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === 'number' && (
                <Pagination.Button
                  asChild
                  aria-label={`Side ${page}`}
                  {...buttonProps}
                >
                  <a href={`#side-${page}`}>{page}</a>
                </Pagination.Button>
              )}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Button
              asChild
              aria-label="Neste side"
              {...nextButtonProps}
            >
              <a href="#neste-side">Neste</a>
            </Pagination.Button>
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
};
