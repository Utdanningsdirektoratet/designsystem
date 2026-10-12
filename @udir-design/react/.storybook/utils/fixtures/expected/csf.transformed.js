export default { title: 'Example' };

export const Primary = { parameters: { layout: 'fullscreen' } };

export const Secondary = {
  args: { label: 'Example' },
};

import { isStory as _udirIsStory } from 'storybook/internal/csf';
((entries, exports) => {
  for (const [annotations, location] of entries) {
    if (exports.filter(value => value === annotations).length !== 1) continue;
    annotations.parameters = { ...annotations.parameters, udirSourceLocation: location };
  }
})([[_udirIsStory(Primary) ? Primary.input : Primary, {"startLine":3,"endLine":3}],
[_udirIsStory(Secondary) ? Secondary.input : Secondary, {"startLine":5,"endLine":7}]], [_udirIsStory(Primary) ? Primary.input : Primary,
_udirIsStory(Secondary) ? Secondary.input : Secondary]);