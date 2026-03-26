import preview from '.storybook/preview';

const meta = preview.meta({
  title: 'Utilities/Hjelpefunksjoner for datavisualisering',
  tags: ['alpha'],
  parameters: {
    sourceCode: {
      autoLinks: { component: false, stories: false },
      links: [
        {
          label: 'Utility functions source',
          path: 'src/utilities/datavis/dataVisualisation.ts',
          order: -11,
        },
        {
          label: 'Highcharts theme source',
          path: 'src/utilities/datavis/highcharts.ts',
          order: -10,
        },
      ],
    },
  },
});

export const Dummy = meta.story({
  tags: ['!dev', '!test'], // hides the story from sidebar and tests
  parameters: {
    chromatic: {
      disableSnapshot: true, // don't run visual tests for this story
    },
  },
});
