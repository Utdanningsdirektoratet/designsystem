import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { Pagination } from 'src/components/pagination/Pagination';
import { Search } from 'src/components/search/Search';
import { type UsePaginationProps, usePagination } from './usePagination';

const meta = preview.meta<
  UsePaginationProps,
  DecoratorType,
  Partial<UsePaginationProps>
>({
  title: 'Utilities/usePagination',
  parameters: {
    componentOrigin: { originator: 'digdir' },
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    currentPage: {
      control: {
        type: 'number',
      },
      defaultValue: 1,
      description: 'The current page number',
      type: { name: 'number' },
    },
    totalPages: {
      control: {
        type: 'number',
      },
      defaultValue: 1,
      description: 'The total number of pages',
      type: { name: 'number' },
    },
    showPages: {
      control: {
        type: 'number',
      },
      defaultValue: 7,
      description: 'The maximum number of pages to show',
      type: { name: 'number' },
    },
    setCurrentPage: {
      description: 'Callback to set the current page',
      type: { name: 'function' },
    },
    onChange: {
      description: 'Callback when the page changes',
      type: { name: 'function' },
    },
  },
});

export const Preview = meta.story({
  args: {
    currentPage: 2,
    totalPages: 10,
    showPages: 7,
  },
  render(args) {
    const [, updateArgs] = useArgs();
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      ...args,
      setCurrentPage: (currentPage) => updateArgs({ currentPage }),
    });

    return (
      <Pagination aria-label="Sidenavigering">
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button aria-label="Forrige side" {...prevButtonProps}>
              Forrige
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === 'number' && (
                <Pagination.Button aria-label={`Side ${page}`} {...buttonProps}>
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
});

export const WithAnchor = meta.story({
  args: {
    currentPage: 2,
    totalPages: 10,
    showPages: 7,
  },
  render(args) {
    const [, updateArgs] = useArgs();
    const [url, setUrl] = useState<string>('https://udir.design.no/pagination');
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
      setUrl(newUrl);
      updateArgs({ currentPage: page });
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
          <Search.Input aria-label="Søk" value={url} />
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
});
