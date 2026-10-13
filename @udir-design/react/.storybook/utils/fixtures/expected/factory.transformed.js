import preview from './preview.js';

const meta = preview.meta({ title: 'Example' });

export const Primary = meta.story({
  parameters: { layout: 'fullscreen' },
});

export const Secondary = meta.story({});

import { isStory as _udirIsStory } from 'storybook/internal/csf';
((entries, exports) => {
  for (const [annotations, location] of entries) {
    if (exports.filter(value => value === annotations).length !== 1) continue;
    annotations.parameters = { ...annotations.parameters, udirSourceLocation: location };
  }
})([[_udirIsStory(Primary) ? Primary.input : Primary, {"startLine":5,"endLine":7}],
[_udirIsStory(Secondary) ? Secondary.input : Secondary, {"startLine":9,"endLine":9}]], [_udirIsStory(Primary) ? Primary.input : Primary,
_udirIsStory(Secondary) ? Secondary.input : Secondary]);