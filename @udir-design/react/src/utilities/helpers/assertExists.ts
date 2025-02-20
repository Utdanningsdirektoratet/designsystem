// A helper function to assert the element is not null.
export function assertExists<T>(
  element: T | null,
  errorMessage = 'Element not found'
): T {
  if (element === null) {
    throw new Error(errorMessage);
  }
  return element;
}
