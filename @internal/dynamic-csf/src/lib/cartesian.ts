export type CartesianInput<T extends object> = {
  [K in keyof T]: Array<T[K]>;
};

export function cartesian<T extends object>(input: CartesianInput<T>): T[] {
  return Object.keys(input).reduce<T[]>((acc, key) => {
    const values = input[key as keyof T];
    return acc.length === 0
      ? values.map((y) => ({ [key]: y }) as T)
      : acc.flatMap((x) => values.map((y) => ({ ...x, [key]: y })));
  }, []);
}
