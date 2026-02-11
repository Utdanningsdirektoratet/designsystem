import { FieldNecessityComponent } from './FieldNecessity';
import './fieldNecessity.css';
import { FieldNecessitySummary } from './FieldNecessitySummary';

export type FieldNecessity = typeof FieldNecessityComponent & {
  Summary: typeof FieldNecessitySummary;
};

export const FieldNecessity: FieldNecessity = Object.assign(
  FieldNecessityComponent,
  {
    Summary: FieldNecessitySummary,
  },
);

FieldNecessity.displayName = 'FieldNecessity';
FieldNecessity.Summary.displayName = 'FieldNecessity.Summary';

export { type FieldNecessityProps } from './FieldNecessity';
export { FieldNecessitySummary } from './FieldNecessitySummary';
