import { useState } from 'react';
import * as Icons from '@udir-design/icons';
import type { AkselIcon } from '@udir-design/icons/metadata';
import { Tag } from 'src/components/tag/Tag';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Heading } from 'src/components/typography/heading/Heading';
import { CodeBlock } from './CodeBlock';
import styles from './iconInformation.module.css';

export function IconInformation({ icon }: { icon: AkselIcon }) {
  const Icon = Icons[`${icon.id}Icon` as keyof typeof Icons];
  const [codeType, setCodeType] = useState<'react' | 'svg'>('react');

  const importCode = {
    react: `
import { ${icon.name}Icon } from
'@udir-design/icons';`.trim(),
    svg: `
import ${icon.name}Svg from
'@udir-design/icons/svg/${icon.name}.svg';`.trim(),
  };

  const usageCode = {
    react: `
<!-- Uten tilhørende synlig tekst -->
<${icon.name}Icon
  aria-label="En tittel for skjermleser"
/>

<!-- Sammen med tilhørende synlig tekst -->
<span>
  <${icon.name}Icon aria-hidden />
  Synlig tekst
</span>
`.trim(),
    svg: `
<!-- Bruk kan variere avhengig av ditt
  oppsett, men kan f.eks være slik: -->
<img
  src={${icon.name}Svg}
  alt="En tittel for skjermleser"
/>
`.trim(),
  };

  return (
    <div className={styles.root}>
      <div className={styles.headingSection}>
        <Icon fontSize="3.5rem" />
        <div>
          <Heading level={3}>{icon.name}</Heading>
        </div>
      </div>
      <div className={styles.tagsSection}>
        <Heading level={4} data-size="xs">
          Alternative søkeord
        </Heading>
        <div className={styles.tags}>
          {icon.keywords.map((keyword) => (
            <Tag key={keyword} data-size="sm">
              {keyword}
            </Tag>
          ))}
        </div>
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
