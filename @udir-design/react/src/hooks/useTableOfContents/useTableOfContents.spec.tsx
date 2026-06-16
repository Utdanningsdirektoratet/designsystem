import { renderHook, waitFor } from '@testing-library/react';
import {
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
  useRef,
} from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { useTableOfContents } from './useTableOfContents';

afterEach(() => {
  document.body.innerHTML = '';
});

const ContainerRefContext = createContext<RefObject<HTMLElement | null> | null>(
  null,
);

const TocFixtureWrapper = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <ContainerRefContext.Provider value={containerRef}>
      <h2 id="outside">Outside container</h2>
      <section ref={containerRef}>
        <h2 id="inside">Inside container</h2>
        <h3 id="nested">Nested heading</h3>
        <h2>Missing id</h2>
        <h3 id="ignored" data-toc-ignore>
          Ignored heading
        </h3>
      </section>
      {children}
    </ContainerRefContext.Provider>
  );
};

const useFixtureContainerRef = () => {
  const containerRef = useContext(ContainerRefContext);

  if (!containerRef) {
    throw new Error('Missing container ref fixture');
  }

  return containerRef;
};

describe('useTableOfContents', () => {
  it('collects headings from document.body by default and excludes ignored headings and headings without id', async () => {
    const { result } = renderHook(() => useTableOfContents(), {
      wrapper: TocFixtureWrapper,
    });

    await waitFor(() => {
      expect(result.current.headings).toEqual([
        { level: 2, name: 'Outside container', id: 'outside' },
        { level: 2, name: 'Inside container', id: 'inside' },
        { level: 3, name: 'Nested heading', id: 'nested' },
      ]);
    });
  });

  it('limits heading collection to the provided containerRef', async () => {
    const { result } = renderHook(
      () => {
        const containerRef = useFixtureContainerRef();
        return useTableOfContents({ containerRef });
      },
      { wrapper: TocFixtureWrapper },
    );

    await waitFor(() => {
      expect(result.current.headings).toEqual([
        { level: 2, name: 'Inside container', id: 'inside' },
        { level: 3, name: 'Nested heading', id: 'nested' },
      ]);
    });
  });

  it('respects headingSelector when only h2 headings should be included', async () => {
    const { result } = renderHook(
      () => {
        const containerRef = useFixtureContainerRef();
        return useTableOfContents({ containerRef, headingSelector: 'h2' });
      },
      { wrapper: TocFixtureWrapper },
    );

    await waitFor(() => {
      expect(result.current.headings).toEqual([
        { level: 2, name: 'Inside container', id: 'inside' },
      ]);
    });
  });

  it('updates the heading list when headingSelector changes', async () => {
    const { result, rerender } = renderHook(
      ({ headingSelector }: { headingSelector: 'h2' | 'h2,h3' }) =>
        useTableOfContents({ headingSelector }),
      {
        initialProps: { headingSelector: 'h2,h3' },
        wrapper: TocFixtureWrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.headings).toEqual([
        { level: 2, name: 'Outside container', id: 'outside' },
        { level: 2, name: 'Inside container', id: 'inside' },
        { level: 3, name: 'Nested heading', id: 'nested' },
      ]);
    });

    rerender({ headingSelector: 'h2' });

    await waitFor(() => {
      expect(result.current.headings).toEqual([
        { level: 2, name: 'Outside container', id: 'outside' },
        { level: 2, name: 'Inside container', id: 'inside' },
      ]);
    });
  });
});
