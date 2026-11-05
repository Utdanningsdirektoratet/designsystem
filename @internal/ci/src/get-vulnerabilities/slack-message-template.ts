import { argv, exit } from 'node:process';

const lists: unknown[] = argv[2] ? JSON.parse(argv[2]) : [];
if (!lists.length) {
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
        text: '<https://github.com/Utdanningsdirektoratet/designsystem/security/dependabot|Dependabot> har funnet nye sikkerhetsadvarsler:',
      },
    },
    {
      type: 'rich_text',
      elements: lists,
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Følg <https://github.com/Utdanningsdirektoratet/designsystem?tab=readme-ov-file#fikse-sikkerhetsadvarsler|disse instruksene> for å fikse eller avvise dem.',
        },
      ],
    },
  ],
};

console.log(JSON.stringify(template));
