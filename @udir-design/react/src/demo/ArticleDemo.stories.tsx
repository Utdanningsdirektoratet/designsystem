import './demoSizing.css';
import { SkipLink } from '@digdir/designsystemet-react';
import type { HTMLAttributes } from 'react';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { demoParameters } from './demoParameters';
import type { DemoProps } from './demoProps';
import { ArticleDemo as ArticleDemoPage } from './pages/article-demo/ArticleDemo';
import { FooterDemo } from './pages/footer';
import { HeaderDemo } from './pages/header';

type ArticleDemoProps = DemoProps & HTMLAttributes<HTMLDivElement>;
const ArticleDemo = (props: ArticleDemoProps) => (
  <div {...props} data-size="auto">
    <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
    <HeaderDemo applicationName="Artikkeldemo" />
    <ArticleDemoPage />
    <FooterDemo />
  </div>
);

const meta = preview.meta({
  title: 'demo/Article Demo',
  component: ArticleDemo,
  decorators: [withScrollHashBehavior],
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
      details: 'Eksempelet er hentet fra udir.no',
    },
  },
});

export const ArticleStory = meta.story({
  args: {
    'data-color-scheme': 'light',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '800px',
      },
    },
  },
});
