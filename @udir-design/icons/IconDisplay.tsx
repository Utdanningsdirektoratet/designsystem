import React from 'react';
import * as Icons from './src/index';

export const IconDisplay = () => {
  return (
    <div>
      <h1>Icon Display Component</h1>
      {Object.entries(Icons).map(([key, Value]) => (
        <React.Fragment key={key}>
          <Value fontSize="3rem" aria-hidden title={key} />
        </React.Fragment>
      ))}
    </div>
  );
};
