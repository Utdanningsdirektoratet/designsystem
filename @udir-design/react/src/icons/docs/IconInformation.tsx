import { useState } from 'react';
import * as Icons from '@udir-design/icons';
import { Tag } from 'src/components/tag/Tag';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { CodeBlock } from './CodeBlock';
import type { UdirIcon } from './IconDisplay.utils';
import styles from './iconInformation.module.css';

export function IconInformation({ icon }: { icon: UdirIcon }) {
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
<${icon.name}Icon
  aria-label="En tittel for skjermleser"
/>
`.trim(),
    svg: `
<!-- Bruk kan variere avhengig av ditt
  oppsett, men kan f.eks være slik: -->
<svg aria-label="En tittel for skjermleser">
  <use href="@udir-design/react/svg/${icon.name}.svg#icon" />
</svg>
`.trim(),
  };

  return (
    <div className={styles.root}>
      <div className={styles.headingSection}>
        <Icon fontSize="3.5rem" />
        <div>
          <Heading level={2} data-size="md">
            {icon.name}
          </Heading>
          <Paragraph>{icon.oftenUsed && 'Foretrukket hos Udir'}</Paragraph>
        </div>
      </div>
      {icon.guidelines && (
        <div className={styles.usecaseSection}>
          <Heading data-size="sm" level={3}>
            Bruksområder
          </Heading>
          {icon.guidelines?.map((item) => (
            <div className={styles.dodont} key={item.description}>
              {item.type === 'do' ? (
                <Icons.CheckmarkCircleFillIcon className={styles.doIcon} />
              ) : (
                <Icons.XMarkOctagonFillIcon className={styles.dontIcon} />
              )}
              {item.description}
            </div>
          ))}
        </div>
      )}
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
    </div>
  );
}
