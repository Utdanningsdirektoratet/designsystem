import * as R from 'ramda';
import type {
  StoryContextForEnhancers,
  StrictInputType,
} from 'storybook/internal/types';

/** Fix various issues with arg types in the documentation */
export function argTypesEnhancer({ argTypes }: StoryContextForEnhancers) {
  return R.map((x): StrictInputType => {
    if (x.control === false) {
      return x;
    }

    if (x.type?.name === 'other') {
      if (x.type.value === 'ReactNode') {
        // Fix issues when trying to edit prop of type ReactNode in args table, as {}
        // (the default value when `control === 'object'`) sometimes makes stories crash.
        return withControlType(x, 'text');
      } else if (x.type.value === 'string | number') {
        // Text control is better than object for `string | number`
        return withControlType(x, 'text');
      } else if (x.type.value === 'Booleanish') {
        // Set "Booleanish" args (`boolean | "true" | "false"`) to just use a boolean toggle
        return withControlType(x, 'boolean');
      } else if (
        x.type.value.includes('EventHandler') ||
        x.type.value.includes(' => ')
      ) {
        // Make event handlers and other functions non-editable
        return {
          ...x,
          control: { disable: true },
        };
      }
    }
    return x;
  }, argTypes);
}

type ControlType =
  | 'number'
  | 'boolean'
  | 'object'
  | 'check'
  | 'inline-check'
  | 'radio'
  | 'inline-radio'
  | 'select'
  | 'multi-select'
  | 'range'
  | 'file'
  | 'color'
  | 'date'
  | 'text';

function withControlType(
  inputType: StrictInputType,
  controlType: ControlType,
): StrictInputType {
  return {
    ...inputType,
    control: {
      type: controlType,
      disable:
        typeof inputType.control === 'object' && inputType.control.disable,
    },
  };
}
