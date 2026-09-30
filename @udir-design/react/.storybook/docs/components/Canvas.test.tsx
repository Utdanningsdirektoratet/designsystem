import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Canvas } from './Canvas';

const mocks = vi.hoisted(() => ({
  useOf: vi.fn(),
  canvas: vi.fn(),
}));

vi.mock('@storybook/addon-docs/blocks', async () => {
  const { createElement } = await import('react');
  return {
    useOf: mocks.useOf,
    Canvas: (props: {
      additionalActions: {
        title: ReactNode;
        onClick: () => void;
        disabled?: boolean;
      }[];
    }) => {
      mocks.canvas(props);
      return createElement(
        'div',
        null,
        props.additionalActions.map((action, index) =>
          createElement(
            'button',
            {
              key: index,
              onClick: action.onClick,
              disabled: action.disabled,
            },
            action.title,
          ),
        ),
      );
    },
  };
});

const story = {
  id: 'components-button--loading',
  title: 'Components/Button',
  tags: ['digdir'],
  parameters: { fileName: './src/components/button/Button.stories.tsx' },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('__GIT_BRANCH__', 'feature/canvas');
  mocks.useOf.mockReturnValue({ story });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('global Canvas wrapper', () => {
  it('renders decorative icons without changing the accessible button labels', () => {
    render(<Canvas />);
    for (const name of ['Open in GitHub', 'Open in new tab']) {
      const button = screen.getByRole('button', { name });
      expect(button.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
        'true',
      );
    }
  });

  it('resolves its own story, forwards props, and opens both destinations safely', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    const of = {};
    render(
      <Canvas
        of={of}
        sourceState="none"
        withToolbar={false}
        layout="fullscreen"
      />,
    );
    expect(mocks.useOf).toHaveBeenCalledWith(of, ['story']);
    expect(mocks.canvas).toHaveBeenCalledWith(
      expect.objectContaining({
        of,
        sourceState: 'none',
        withToolbar: false,
        layout: 'fullscreen',
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open in GitHub' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open in new tab' }));
    expect(open.mock.calls).toEqual([
      [
        'https://github.com/Utdanningsdirektoratet/designsystem/blob/feature/canvas/@udir-design/react/src/components/button/Button.stories.tsx',
        '_blank',
        'noopener,noreferrer',
      ],
      [
        'iframe.html?id=components-button--loading',
        '_blank',
        'noopener,noreferrer',
      ],
    ]);
  });

  it('resolves the default story when of is omitted', () => {
    render(<Canvas />);
    expect(mocks.useOf).toHaveBeenCalledWith('story', ['story']);
  });

  it('opens the build-generated story definition range on GitHub', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    mocks.useOf.mockReturnValue({
      story: {
        ...story,
        parameters: {
          ...story.parameters,
          udirSourceLocation: { startLine: 183, endLine: 216 },
        },
      },
    });
    render(<Canvas />);
    fireEvent.click(screen.getByRole('button', { name: 'Open in GitHub' }));
    expect(open).toHaveBeenCalledWith(
      'https://github.com/Utdanningsdirektoratet/designsystem/blob/feature/canvas/@udir-design/react/src/components/button/Button.stories.tsx#L183-L216',
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('preserves prop actions in preference to parameter actions', () => {
    const onClick = vi.fn();
    mocks.useOf.mockReturnValue({
      story: {
        ...story,
        parameters: {
          ...story.parameters,
          docs: {
            canvas: {
              additionalActions: [{ title: 'Parameter action', onClick }],
            },
          },
        },
      },
    });
    render(
      <Canvas additionalActions={[{ title: 'Custom action', onClick }]} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Custom action' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(
      screen.queryByRole('button', { name: 'Parameter action' }),
    ).toBeNull();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('preserves parameter actions when no prop actions are supplied', () => {
    mocks.useOf.mockReturnValue({
      story: {
        ...story,
        parameters: {
          ...story.parameters,
          docs: {
            canvas: {
              additionalActions: [
                { title: 'Parameter action', onClick: vi.fn() },
              ],
            },
          },
        },
      },
    });
    render(<Canvas />);
    expect(
      screen.getAllByRole('button').map((button) => button.textContent?.trim()),
    ).toEqual(['Parameter action', 'Open in GitHub', 'Open in new tab']);
  });

  it('disables unavailable GitHub sources but retains the standalone preview action', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    mocks.useOf.mockReturnValue({ story: { ...story, parameters: {} } });
    render(<Canvas />);
    const button = screen.getByRole('button', {
      name: 'Open in GitHub',
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(open).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Open in new tab' }));
    expect(open).toHaveBeenCalledOnce();
  });

  it('honors Storybook custom preview URLs', () => {
    vi.stubGlobal(
      'PREVIEW_URL',
      'https://preview.example/subpath/iframe.html?token=example',
    );
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<Canvas />);
    fireEvent.click(screen.getByRole('button', { name: 'Open in new tab' }));
    expect(open).toHaveBeenCalledWith(
      'https://preview.example/subpath/iframe.html?token=example&id=components-button--loading',
      '_blank',
      'noopener,noreferrer',
    );
  });
});
