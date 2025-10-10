// string includes
export const includes = (t: string, q: string) =>
  (t ?? '').toLowerCase().includes((q ?? '').toLowerCase());

// pick all if matching, else filtered
export const pick = <T>(hit: boolean, all: T, filtered: T) =>
  hit ? all : filtered;

// check if object or array has any entries
export const has = (x: unknown) =>
  Array.isArray(x) ? x.length > 0 : Object.keys(x as object).length > 0;
