import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import { useState } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import { expect, userEvent, within } from 'storybook/test';
import {
  usePagination,
  UsePaginationProps,
} from 'src/utilities/hooks/usePagination/usePagination';
import { Search } from '../search/Search';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Preview: Story = {
  render(args) {
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

type WithAnchorPaginationProps = UsePaginationProps & {
  url: string;
};

export const WithAnchor: StoryObj<WithAnchorPaginationProps> = {
  args: {
    currentPage: 2,
    totalPages: 10,
    showPages: 7,
    url: 'https://udir.design.no/pagination',
  },
  render(args) {
    const [, updateArgs] = useArgs();
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      ...args,
    });
    const handleAnchorClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      page: number,
    ) => {
      e.preventDefault();
      if (page === 0 || page > args.totalPages) {
        return;
      }
      const newUrl = `https://udir.design.no/pagination#side-${page}`;
      updateArgs({ currentPage: page, url: newUrl });
      return;
    };

    return (
      <div
        style={{
          gap: 70,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Search>
          <Search.Input aria-label="Søk" value={args.url} />
        </Search>
        <Pagination aria-label="Sidenavigering">
          <Pagination.List>
            <Pagination.Item>
              <Pagination.Button
                asChild
                aria-label="Forrige side"
                {...prevButtonProps}
              >
                <a
                  onClick={(e) => handleAnchorClick(e, args.currentPage - 1)}
                  href={`#side-${args.currentPage - 1}`}
                >
                  Forrige
                </a>
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
                    <a
                      href={`#side-${page}`}
                      onClick={(e) => handleAnchorClick(e, page)}
                    >
                      {page}
                    </a>
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
                <a
                  onClick={(e) => handleAnchorClick(e, args.currentPage + 1)}
                  href={`#side-${args.currentPage + 1}`}
                >
                  Neste
                </a>
              </Pagination.Button>
            </Pagination.Item>
          </Pagination.List>
        </Pagination>
      </div>
    );
  },
};

export const Mobile: Story = {
  render() {
    return (
      <Pagination>
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button aria-label="Forrige side" variant="tertiary" />
          </Pagination.Item>

          <Pagination.Item>
            <Pagination.Button aria-label="Side 2" variant="tertiary">
              2
            </Pagination.Button>
          </Pagination.Item>

          <Pagination.Item>
            <Pagination.Button aria-label="Side 3">3</Pagination.Button>
          </Pagination.Item>

          <Pagination.Item>
            <Pagination.Button aria-label="Side 4" variant="tertiary">
              4
            </Pagination.Button>
          </Pagination.Item>

          <Pagination.Item>
            <Pagination.Button aria-label="Neste side" variant="tertiary" />
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
};
