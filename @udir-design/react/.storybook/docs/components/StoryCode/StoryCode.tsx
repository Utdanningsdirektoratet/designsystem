import { Source } from '@storybook/addon-docs/blocks';
import camelcase from 'camelcase';
import cl from 'clsx/lite';
import type { ComponentProps } from 'react';
// The tabs that Storybook's props table uses for subcomponents. `storybook/internal` has no
// stability guarantee, so check this after Storybook upgrades.
import { TabsView } from 'storybook/internal/components';
import styles from './storyCode.module.css';

type SourceProps = ComponentProps<typeof Source>;

/**
 * The code of a story with `parameters.css`, as two files in tabs: the story's JSX, and the CSS
 * that readers should put in their own CSS file. `Canvas` shows it instead of Storybook's own
 * code panel, which only takes one language.
 */
export function StoryCode({
  of,
  name,
  css,
  transform,
}: {
  /** The story, as for `Canvas`. Without it, the story in context. */
  of?: SourceProps['of'];
  /** The story's name, which names the files, like `WithoutContext.tsx` and `withoutContext.css` */
  name: string;
  css: string;
  /** The story's own source transform, from `parameters.docs.source.transform` */
  transform?: SourceProps['transform'];
}) {
  // Named like the repo's own component files, such as `ProgressBar.tsx` and `progressBar.css`
  const tsxFile = `${camelcase(name, { pascalCase: true })}.tsx`;
  const cssFile = `${camelcase(name)}.css`;
  // The JSX imports the CSS file, as it would in an app
  const withCssImport: NonNullable<SourceProps['transform']> = async (
    code,
    context,
  ) => {
    const transformed = transform ? await transform(code, context) : code;
    return `import './${cssFile}';\n\n${transformed}`;
  };

  return (
    <div className={cl('sb-unstyled', styles.storyCode)}>
      <TabsView
        className={styles.tabs}
        tabs={[
          {
            id: 'tsx',
            title: tsxFile,
            children: <Source of={of} transform={withCssImport} dark />,
          },
          {
            id: 'css',
            title: cssFile,
            children: <Source code={css} language="css" dark />,
          },
        ]}
      />
    </div>
  );
}
