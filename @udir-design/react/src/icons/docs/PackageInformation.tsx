import { useState } from 'react';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { CodeBlock } from './CodeBlock';
import styles from './packageInformation.module.css';

export function PackageInformation() {
  const [codeType, setCodeType] = useState<'react' | 'svg'>('react');

  const usageCode = {
    react: `
import { FilterIcon } from
"@udir-design/icons";

function MyComponent () {
  return (
    <Button>
      <FilterIcon aria-hidden />
      Filtrer
    </Button>
  )
}
`.trim(),
    svg: `
/* css */
@import 'npm:@udir-design/icons/dist/style.css';

<!-- html -->
<svg aria-hidden>
  <use href="npm:@udir-design/icons/dist/svg/Airplane.svg#root" />
</svg>
`.trim(),
  };

  return (
    <div className={styles.root}>
      <div>
        <div>
          <Heading level={2}>Kom i gang</Heading>
          <Paragraph className={styles.ingress}>
            Slik kommer du i gang med å bruke ikonbiblioteket i kode som
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
        code="npm add @udir-design/icons@beta"
      />
      <CodeBlock heading="Bruk" code={usageCode[codeType]} />
    </div>
  );
}
