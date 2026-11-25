import {
  CodeIcon,
  ComponentFillIcon,
  ComponentIcon,
  ImageFillIcon,
  ImageIcon,
  LayersFillIcon,
  LayersIcon,
  PaletteFillIcon,
  PaletteIcon,
  TokenFillIcon,
  TokenIcon,
} from '@udir-design/icons';
import { getPath } from '.storybook/docs/components/StorybookLink';
import { ResourceLinkHorizontal } from 'src/docs/ResourceLinks';
import styles from '../../docs/ResourceLinks.module.css';

export function StorybookResourceLinks() {
  return (
    <div className={styles.resourceLinks}>
      <ResourceLinkHorizontal
        href={getPath('/docs/introduksjon-kom-i-gang-som-utvikler--docs')}
        // The glyph fills less of its viewBox than the other icons
        icon={<CodeIcon aria-hidden style={{ scale: 1.2 }} />}
        headingLevel={3}
        heading="Kom i gang som utvikler"
        description="Installasjon, oppsett og bruk av designsystemet"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/introduksjon-kom-i-gang-som-designer--docs')}
        icon={<PaletteIcon aria-hidden />}
        activeIcon={<PaletteFillIcon aria-hidden />}
        headingLevel={3}
        heading="Kom i gang som designer"
        description="Designressurser og oppsett for designere"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/components-introduksjon--docs')}
        icon={<ComponentIcon aria-hidden />}
        activeIcon={<ComponentFillIcon aria-hidden />}
        headingLevel={3}
        heading="Komponenter"
        description="Eksempler og retningslinjer for komponentene"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-introduksjon--docs')}
        icon={<LayersIcon aria-hidden />}
        activeIcon={<LayersFillIcon aria-hidden />}
        headingLevel={3}
        heading="Mønstre"
        description="Felles løsninger for gjenkjennelige brukeropplevelser"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/design-tokens-oversikt--docs')}
        icon={<TokenIcon aria-hidden />}
        activeIcon={<TokenFillIcon aria-hidden />}
        headingLevel={3}
        heading="Designtokens"
        description="Designtokens for farger, typografi og størrelser"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/iconsandsymbols-retningslinjer--docs')}
        icon={<ImageIcon aria-hidden />}
        activeIcon={<ImageFillIcon aria-hidden />}
        headingLevel={3}
        heading="Ikoner og symboler"
        description="Oversikt og retningslinjer for ikoner og symboler"
      />
    </div>
  );
}
