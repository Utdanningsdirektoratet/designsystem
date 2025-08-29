import React from 'react';
import * as Icons from './src/index';
import { Search } from '@udir-design/react/beta';
import { ToggleGroup } from '@udir-design/react/alpha';

export const IconDisplay = () => {
  return (
    <div>
      <h1>Icon Display Component</h1>
      <form onSubmit={() => {}}>
        <Search>
          <Search.Input aria-label="Søk" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </form>
      <ToggleGroup defaultValue="innboks" onChange={() => {}}>
        <ToggleGroup.Item value="innboks">Outline</ToggleGroup.Item>
        <ToggleGroup.Item value="utkast">Fill</ToggleGroup.Item>
      </ToggleGroup>
      {Object.entries(Icons).map(([key, Value]) => (
        <React.Fragment key={key}>
          <Value fontSize="3rem" aria-hidden title={key} />
        </React.Fragment>
      ))}
    </div>
  );
};
