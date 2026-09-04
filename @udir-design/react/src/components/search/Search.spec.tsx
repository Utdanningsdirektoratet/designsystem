import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { assertExists } from '../../utilities/helpers/assertExists';
import { Search } from './Search';

afterEach(cleanup);

const ControlledSearch = ({
  disabled = false,
  initialValue = '',
}: {
  disabled?: boolean;
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <Search>
        <Search.Input
          aria-label="Søk"
          type="text"
          disabled={disabled}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Search.Clear />
      </Search>
      <button type="button" onClick={() => setValue('Skole')}>
        Sett verdi
      </button>
      <button type="button" onClick={() => setValue('')}>
        Tøm verdi
      </button>
    </>
  );
};

/**
 * The clear button is gated by the `hidden` attribute, which the user agent
 * stylesheet turns into `display: none`.
 */
const clearButtonIsVisible = (container: HTMLElement) => {
  const clear = assertExists(
    container.querySelector('button[type="reset"]'),
    'Clear button not found',
  );

  return (
    !clear.hasAttribute('hidden') && getComputedStyle(clear).display !== 'none'
  );
};

/**
 * u-combobox only recomputes the clear button's `hidden` attribute on real `input`
 * events, so a value that comes from React state leaves it stale in both directions.
 * See https://github.com/digdir/designsystemet/issues/5295 and the workaround in
 * `useSyncedClearButton`.
 */
describe('Search.Clear follows the input value', () => {
  it('is hidden while the field is empty', () => {
    const { container } = render(<ControlledSearch />);

    expect(clearButtonIsVisible(container)).toBe(false);
  });

  it('is visible when the field starts out with a value', () => {
    const { container } = render(<ControlledSearch initialValue="Skole" />);

    expect(clearButtonIsVisible(container)).toBe(true);
  });

  it('appears when the value is set from React state', () => {
    const { container } = render(<ControlledSearch />);

    fireEvent.click(screen.getByRole('button', { name: 'Sett verdi' }));

    expect(clearButtonIsVisible(container)).toBe(true);
  });

  it('disappears when the field is emptied from React state', () => {
    const { container } = render(<ControlledSearch initialValue="Skole" />);

    fireEvent.click(screen.getByRole('button', { name: 'Tøm verdi' }));

    expect(clearButtonIsVisible(container)).toBe(false);
  });

  it('stays hidden for a disabled field that has a value', () => {
    const { container } = render(
      <ControlledSearch disabled initialValue="Skole" />,
    );

    expect(clearButtonIsVisible(container)).toBe(false);
  });

  it('still forwards a ref to the clear button', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <Search>
        <Search.Input aria-label="Søk" type="text" />
        <Search.Clear ref={ref} />
      </Search>,
    );

    expect(ref.current).toBe(container.querySelector('button[type="reset"]'));
  });
});
