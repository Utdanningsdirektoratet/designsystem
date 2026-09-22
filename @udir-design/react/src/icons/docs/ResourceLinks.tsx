import { FaceSmileIcon, ImageIcon } from '@udir-design/icons';
import { getPath } from '.storybook/docs/components/StorybookLink';
import { ResourceLinkHorizontal } from 'src/docs/ResourceLinks';
import styles from '../../docs/ResourceLinks.module.css';

export function IconsAndSymbolsResourceLinks() {
  return (
    <div className={styles.resourceLinks}>
      <ResourceLinkHorizontal
        href={getPath('/docs/iconsandsymbols-ikoner--ikoner')}
        icon={<FaceSmileIcon aria-hidden />}
        headingLevel={3}
        heading="Ikoner"
        description="Se våre ikoner"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/iconsandsymbols-symboler--symboler')}
        icon={<ImageIcon aria-hidden />}
        headingLevel={3}
        heading="Symboler"
        description="Se våre symboler"
      />
    </div>
  );
}
