import React, { useState } from 'react';
import * as Icons from '@udir-design/icons/src/index';
import { Search } from '@udir-design/react/beta';
import { ToggleGroup } from '@udir-design/react/alpha';
import { useDebounceCallback } from '@digdir/designsystemet-react';

export const IconDisplay = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const setSearchTermDebounced = useDebounceCallback(setSearchTerm, 500);

  const outlineIcons = Object.entries(Icons).filter(
    ([key]) => !key.includes('Fill'),
  );
  const fillIcons = Object.entries(Icons).filter(([key]) =>
    key.includes('Fill'),
  );
  const [list, setList] = useState(outlineIcons);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-size-6)',
          marginBottom: 'var(--ds-size-10)',
          marginTop: 'var(--ds-size-6)',
        }}
      >
        <form>
          <Search>
            <Search.Input
              aria-label="Søk"
              value={inputValue}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                // Don't search while typing
                setSearchTerm('');
                // Search after stopped typing
                setSearchTermDebounced(newValue);
              }}
            />
            <Search.Clear />
          </Search>
        </form>
        <ToggleGroup
          defaultValue="outline"
          onChange={(value) => {
            value === 'fill' ? setList(fillIcons) : setList(outlineIcons);
          }}
        >
          <ToggleGroup.Item value="outline">Outline</ToggleGroup.Item>
          <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
        </ToggleGroup>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, auto)',
          gap: 'var(--ds-size-4)',
        }}
      >
        {list
          .filter(([key]) => key.toLowerCase().includes(searchTerm))
          .map(([key, Value]) => (
            <React.Fragment key={key}>
              <Value fontSize="3rem" aria-hidden title={key} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
