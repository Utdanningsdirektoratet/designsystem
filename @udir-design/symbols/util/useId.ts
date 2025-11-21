//https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useId.ts
import React, { useEffect, useState } from 'react';

let globalId = 0;
function useGlobalId(idOverride?: string): string | undefined {
  const [defaultId, setDefaultId] = useState(idOverride);
  const id = idOverride || defaultId;
  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`udir-symbol-${globalId}`);
    }
  }, [defaultId]);
  return id;
}

// eslint-disable-next-line no-useless-concat
const key = 'useId' + ''; // Workaround for https://github.com/webpack/webpack/issues/14814
const maybeReactUseId = (React as unknown as Record<string, unknown>)[key] as
  | (() => string)
  | undefined;

const useReactId: () => string | undefined =
  typeof maybeReactUseId === 'function' ? maybeReactUseId : () => undefined;

/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export function useId(idOverride?: string): string | undefined {
  const reactId = useReactId();
  const cleaned = reactId?.replace(/:/g, '');
  const globalIdValue = useGlobalId(idOverride);
  return idOverride ?? cleaned ?? globalIdValue;
}
