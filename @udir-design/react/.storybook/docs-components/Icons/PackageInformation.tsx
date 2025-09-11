import { Heading, Paragraph } from 'src/components/alpha';
import { CodeBlock } from './CodeBlock';

export function PackageInformation() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-size-3)',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Heading level={2}>React komponenter</Heading>
          <Paragraph>
            Alle ikonene er tilgjengelige som egne React-komponenter.
          </Paragraph>
        </div>
      </div>
      <CodeBlock heading="Import" code="npm install @udir-design/icons" />
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
