import preview from '.storybook/preview';

const meta = preview.meta({
  title: 'Utilities/Hjelpefunksjoner for skjema',
  tags: ['alpha'],
  parameters: {
    sourceCode: {
      autoLinks: { component: false, stories: false },
      links: [
        {
          label: 'Utility functions source',
          path: 'src/utilities/form/navigation.ts',
          order: -10,
        },
      ],
    },
  },
});
export default meta;

export const Dummy = meta.story({
  tags: ['!dev', '!test'], // hides the story from sidebar and tests
  parameters: {
    chromatic: {
      disableSnapshot: true, // don't run visual tests for this story
    },
  },
});
