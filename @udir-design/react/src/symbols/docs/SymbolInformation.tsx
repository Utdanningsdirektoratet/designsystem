import { useState } from 'react';
import * as Symbols from '@udir-design/symbols';
import { Select } from 'src/components/select/Select';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Heading } from 'src/components/typography/heading/Heading';
import { CodeBlock } from '../../icons/docs/CodeBlock';
import { type UdirSymbol, symbolsByBaseName } from './SymbolDisplay.utils';
import styles from './symbolInformation.module.css';

export function SymbolInformation({ symbol }: { symbol: UdirSymbol }) {
  const [codeType, setCodeType] = useState<'react' | 'svg'>('react');
  const [selectedVariant, setSelectedVariant] = useState<UdirSymbol>(symbol);

  const baseName = symbol.sub_category;
  const variants = symbolsByBaseName[baseName] ?? [symbol];

  const currentVariant =
    variants.find((v) => v.id === selectedVariant.id) ?? symbol;

  const Symbol = Symbols[`${currentVariant.id}Symbol` as keyof typeof Symbols];

  const importCode = {
    react: `
import { ${currentVariant.name}Symbol } from
'@udir-design/symbols';`.trim(),
    svg: `
import ${currentVariant.name}Svg from
'@udir-design/symbols/svg/${currentVariant.name}.svg';`.trim(),
  };

  const usageCode = {
    react: `
<${currentVariant.name}Symbol
  aria-label="En tittel for skjermleser"
/>
`.trim(),
    svg: `
<!-- Bruk kan variere avhengig av ditt
  oppsett, men kan f.eks være slik: -->
<svg aria-label="En tittel for skjermleser">
  <use href="@udir-design/symbols/svg/${currentVariant.name}.svg#symbol" />
</svg>
`.trim(),
  };

  return (
    <div className={styles.root}>
      <div className={styles.headingSection}>
        <div>
          <Heading level={2} data-size="md">
            {baseName}
          </Heading>
        </div>
      </div>
      <Select
        value={currentVariant.id}
        onChange={(e) => {
          const next = variants.find((v) => v.id === e.target.value);
          if (next) setSelectedVariant(next);
        }}
        style={{ width: 'fit-content' }}
      >
        {variants.map((variant) => (
          <Select.Option key={variant.id} value={variant.id}>
            {variant.variant}
          </Select.Option>
        ))}
      </Select>
      <div className={styles.symbolPreview}>
        <Symbol size="10rem" />
      </div>
      <div className={styles.codeSection}>
        <Heading level={4} data-size="xs">
          Bruk i kode
        </Heading>
        <ToggleGroup
          data-size="sm"
          variant="secondary"
          value={codeType}
          onChange={(value) => setCodeType(value as 'react' | 'svg')}
        >
          <ToggleGroup.Item value="react">React</ToggleGroup.Item>
          <ToggleGroup.Item value="svg">SVG</ToggleGroup.Item>
        </ToggleGroup>
        <CodeBlock heading="Import" code={importCode[codeType]} />
        <CodeBlock heading="Bruk" code={usageCode[codeType]} />
      </div>
    </div>
  );
}
