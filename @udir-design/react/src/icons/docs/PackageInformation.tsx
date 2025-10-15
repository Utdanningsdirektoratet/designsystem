import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { CodeBlock } from './CodeBlock';
import styles from './packageInformation.module.css';

export function PackageInformation() {
  return (
    <div className={styles.root}>
      <div>
        <div>
          <Heading level={2}>React-komponenter</Heading>
          <Paragraph className={styles.ingress}>
            Slik kommer du i gang med å bruke ikonbiblioteket.
          </Paragraph>
        </div>
      </div>
      <CodeBlock heading="Import" code="npm add @udir-design/icons@beta" />
      <CodeBlock
        heading="React"
        code={`import { FilterIcon } from
"@udir-design/icons";

function MyComponent () {
  return (
    <div>
      <FilterIcon aria-hidden />
    </div>
  )
}`}
      />
    </div>
  );
}
