import { AkselIcon } from '@udir-design/icons/metadata';
import * as Icons from '@udir-design/icons';
import { Tag } from 'src/components/beta';
import { Heading, Paragraph } from 'src/components/alpha';
import { CodeBlock } from './CodeBlock';

export function IconInformation({ icon }: { icon?: AkselIcon | null }) {
  if (!icon) {
    return null;
  }

  const Icon = Icons[
    `${icon.id}Icon` as keyof typeof Icons
  ] as React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-size-3)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Heading level={3}>{icon.name}</Heading>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icons.ArrowDownRightIcon fontSize="1.5rem" aria-hidden />
            <Paragraph style={{ marginBlock: '0px' }}>
              {icon?.sub_category}
            </Paragraph>
          </span>
        </div>
        <Icon fontSize="3.5rem" />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-size-2)',
          marginTop: 'var(--ds-size-3)',
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        {icon.keywords.map((keyword) => (
          <Tag key={keyword}>{keyword}</Tag>
        ))}
      </div>
      <CodeBlock
        heading="Import"
        code={`import { ${icon.name} } from '@udir-design/icons';`}
      />
      <CodeBlock heading="React" code={`<${icon.name} />`} />
    </div>
  );
}
