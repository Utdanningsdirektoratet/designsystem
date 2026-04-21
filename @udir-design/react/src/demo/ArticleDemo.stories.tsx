import './demoSizing.css';
import { SkipLink } from '@digdir/designsystemet-react';
import type { HTMLAttributes } from 'react';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { DemoBanner } from 'src/components/demoBanner/DemoBanner';
import { ArticleDemo as ArticleDemoPage } from '../../demo-pages/article-demo/ArticleDemo';
import { FooterDemo } from './components/footer';
import { HeaderDemo } from './components/header';
import { demoParameters } from './demoParameters';
import type { DemoProps } from './demoProps';

type ArticleDemoProps = DemoProps & HTMLAttributes<HTMLDivElement>;
const ArticleDemo = (props: ArticleDemoProps) => (
  <div {...props} data-size="auto">
    <SkipLink href="#main">Hopp til hovedinnholdet</SkipLink>
    <DemoBanner>
      <HeaderDemo applicationName="Utdanningsdirektoratet" />
      <ArticleDemoPage />
      <FooterDemo />
    </DemoBanner>
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
    layout: 'fullscreen',
    customStyles: {
      height: 'auto',
      overflow: 'visible',
      padding: 0,
    },
    docs: {
      story: {
        inline: false,
        height: '800px',
      },
    },
  },
});
