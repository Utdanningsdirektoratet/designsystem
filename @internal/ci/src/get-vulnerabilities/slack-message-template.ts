import { argv, exit } from 'node:process';

const bulletPoints: unknown[] = argv[2] ? JSON.parse(argv[2]) : [];
if (!bulletPoints.length) {
  exit(0);
}

const template = {
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: ':rotating_light: Sårbarheter i avhengigheter',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`pnpm audit` rapporterer disse sikkerhetsadvarslene:',
      },
    },
    {
      type: 'rich_text',
      elements: [
        {
          type: 'rich_text_list',
          style: 'bullet',
          indent: 0,
          elements: bulletPoints,
        },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Følg <https://github.com/Utdanningsdirektoratet/designsystem?tab=readme-ov-file#fikse-sikkerhetsadvarsler|disse instruksene> for å bli kvitt disse meldingene.',
        },
      ],
    },
  ],
};

console.log(JSON.stringify(template));
