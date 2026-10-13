import preview from './preview.js';

const meta = preview.meta({ title: 'Example' });

export const Primary = meta.story({
  parameters: { layout: 'fullscreen' },
});

export const Secondary = meta.story({});
