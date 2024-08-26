// The jest-serializer-html package is available as a dependency of the test-runner
import * as jestSerializerHtml from 'jest-serializer-html';

const CLASS_PATTERN = /class="[^"]+"/g;

export function serialize(val) {
  const withoutClass = val.replace(CLASS_PATTERN, '');
  return jestSerializerHtml.print(withoutClass);
}
export function test(val) {
  return jestSerializerHtml.test(val);
}
