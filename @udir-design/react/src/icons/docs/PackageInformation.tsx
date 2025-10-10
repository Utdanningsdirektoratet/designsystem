import { Heading, Paragraph } from 'src/components/beta';
import styles from './packageInformation.module.css';
import { CodeBlock } from './CodeBlock';

export function PackageInformation() {
  return (
    <div className={styles.root}>
      <div>
        <div>
          <Heading level={2}>React komponenter</Heading>
          <Paragraph className={styles.ingress}>
            Slik kommer du i gang med å bruke ikonbiblioteket.
          </Paragraph>
        </div>
      </div>
      <CodeBlock heading="Import" code="npm install @udir-design/icons@beta" />
      <CodeBlock
        heading="React"
        code={`import { FilterIcon } from "@udir-design/icons";

function MyComponent () {
  return (
    <div>
      <FilterIcon />
      />
    </div>
  )
}`}
      />
    </div>
  );
}
