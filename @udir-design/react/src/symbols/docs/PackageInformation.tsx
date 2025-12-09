import { useState } from 'react';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { CodeBlock } from '../../icons/docs/CodeBlock';
import styles from '../../icons/docs/packageInformation.module.css';

export function PackageInformation() {
  const [codeType, setCodeType] = useState<'react' | 'svg'>('react');

  const usageCode = {
    react: `
import { AnalyseFillSymbol } from
"@udir-design/symbols";

function MyComponent () {
  return (
    <AnalyseFillSymbol aria-hidden />
  )
}
`.trim(),
    svg: `
<!-- html -->
<svg aria-hidden>
  <use href="npm:@udir-design/symbols/dist/svg/AnalyseFill.svg#symbol" />
</svg>
`.trim(),
  };

  return (
    <div className={styles.root}>
      <div>
        <div>
          <Heading level={2}>Kom i gang</Heading>
          <Paragraph className={styles.ingress}>
            Slik kommer du i gang med å bruke symbolbiblioteket i kode som
            React-komponent eller svg-filer.
          </Paragraph>
        </div>
      </div>
      <ToggleGroup
        data-size="sm"
        variant="secondary"
        value={codeType}
        onChange={(value) => setCodeType(value as 'react' | 'svg')}
      >
        <ToggleGroup.Item value="react">React</ToggleGroup.Item>
        <ToggleGroup.Item value="svg">SVG</ToggleGroup.Item>
      </ToggleGroup>
      <CodeBlock
        heading="Installasjon"
        code="npm add @udir-design/symbols@beta"
      />
      <CodeBlock heading="Bruk" code={usageCode[codeType]} />
    </div>
  );
}
