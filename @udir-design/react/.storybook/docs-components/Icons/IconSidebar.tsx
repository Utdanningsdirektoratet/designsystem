import { AkselIcon } from '@udir-design/icons/metadata';
import * as Icons from '@udir-design/icons';
import { Card, Dialog, Tag } from 'src/components/beta';
import { Heading, Paragraph } from 'src/components/alpha';

export function IconPageSidebar({
  icon,
  resetIcon,
}: {
  icon?: AkselIcon | null;
  resetIcon: () => void;
}) {
  if (!icon) {
    return null;
  }

  const Icon = Icons[
    `${icon.id}Icon` as keyof typeof Icons
  ] as React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;

  return (
    <Dialog
      onClose={() => resetIcon()}
      aria-label={`${icon.name} ikon`}
      modal={false}
      open={Boolean(icon)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Heading level={3}>{icon.name}</Heading>
            <span style={{ display: 'flex' }}>
              <Icons.ArrowDownRightIcon fontSize="1.5rem" aria-hidden />
              <Paragraph>{icon?.sub_category}</Paragraph>
            </span>
          </div>
          <Icon fontSize="5rem" />
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-size-2)',
          }}
        >
          {icon.keywords.map((keyword) => (
            <Tag key={keyword}>{keyword}</Tag>
          ))}
        </div>
        <Card>
          <Heading level={4}>Import</Heading>
          <code>{`import { ${icon.name} } from '@udir-design/icons';`}</code>
        </Card>
        <Card>
          <Heading level={4}>React</Heading>
          <code>{`<${icon.name} />`}</code>
        </Card>
      </div>
    </Dialog>
  );
}
