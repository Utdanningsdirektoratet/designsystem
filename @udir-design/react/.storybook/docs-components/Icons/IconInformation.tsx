import { AkselIcon } from '@udir-design/icons/metadata';
import * as Icons from '@udir-design/icons';
import { Tag, Heading } from 'src/components/beta';
import { CodeBlock } from './CodeBlock';
import styles from './iconInformation.module.css';

export function IconInformation({ icon }: { icon: AkselIcon }) {
  const Icon = Icons[
    `${icon.id}Icon` as keyof typeof Icons
  ] as React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;

  return (
    <div className={styles.root}>
      <div className={styles.headingSection}>
        <Icon fontSize="3.5rem" />
        <div>
          <Heading level={3}>{icon.name}</Heading>
        </div>
      </div>
      <div className={styles.tagsSection}>
        {icon.keywords.map((keyword) => (
          <Tag key={keyword} data-size="sm">
            {keyword}
          </Tag>
        ))}
      </div>
      <CodeBlock
        heading="Import"
        code={`import { ${icon.name}Icon } from '@udir-design/icons';`}
      />
      <CodeBlock heading="React" code={`<${icon.name}Icon />`} />
    </div>
  );
}
