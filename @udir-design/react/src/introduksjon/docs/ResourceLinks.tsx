import {
  CodeIcon,
  ComponentIcon,
  ImageIcon,
  LayersIcon,
  PaletteIcon,
  TokenIcon,
} from '@udir-design/icons';
import { getPath } from '.storybook/docs/components/StorybookLink';
import {
  figmaIllustration,
  githubIllustration,
  ResourceLink,
  ResourceLinkHorizontal,
  udirIllustration,
} from 'src/docs/ResourceLinks';
import styles from '../../docs/ResourceLinks.module.css';

export function StorybookResourceLinks() {
  return (
    <div className={styles.resourceLinks}>
      <ResourceLinkHorizontal
        href={getPath('/docs/introduksjon-kom-i-gang-som-utvikler--docs')}
        icon={<CodeIcon aria-hidden />}
        headingLevel={3}
        heading="Kom i gang som utvikler"
        description="Installasjon, oppsett og bruk av designsystemet"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/introduksjon-kom-i-gang-som-designer--docs')}
        icon={<PaletteIcon aria-hidden />}
        headingLevel={3}
        heading="Kom i gang som designer"
        description="Designressurser og oppsett for designere"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/components-introduksjon--docs')}
        icon={<ComponentIcon aria-hidden />}
        headingLevel={3}
        heading="Komponenter"
        description="Eksempler og retningslinjer for komponentene"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-introduksjon--docs')}
        icon={<LayersIcon aria-hidden />}
        headingLevel={3}
        heading="Mønstre"
        description="Felles løsninger for gjenkjennelige brukeropplevelser"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/design-tokens-oversikt--docs')}
        icon={<TokenIcon aria-hidden />}
        headingLevel={3}
        heading="Designtokens"
        description="Designtokens for farger, typografi og størrelser"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/iconsandsymbols-retningslinjer--docs')}
        icon={<ImageIcon aria-hidden />}
        headingLevel={3}
        heading="Ikoner og symboler"
        description="Oversikt og retningslinjer for ikoner og symboler"
      />
    </div>
  );
}

export function LandingResourceLinks() {
  return (
    <div className={styles.wrapper}>
      <ResourceLink
        href="https://github.com/Utdanningsdirektoratet/designsystem"
        illustration={githubIllustration}
        headingLevel={3}
        heading="Github-repo"
        description="Kildekoden finnes tilgjengelig i Udir sin Github-organisasjon."
      />
      <ResourceLink
        href="https://www.udir.no/om-udir/designprofil/"
        illustration={udirIllustration}
        headingLevel={3}
        heading="Designprofil på udir.no"
        description="Oversikt over farger, typografi, stil og tone, etc."
      />
      <ResourceLink
        href="https://www.figma.com/files/1290654482467394866/project/437326546"
        illustration={figmaIllustration}
        headingLevel={3}
        heading="Illustrasjoner i Figma"
        description="Alle illustrasjonene våre i flere varianter og formater tilpasset
              flere typer bruk."
      />
      <ResourceLink
        href="https://www.figma.com/design/SSdGSjSYPDSyX2IfHLfmEL/Symbolbibliotek?node-id=0-1&node-type=canvas&t=caNDp1IPvJWyyCUi-0"
        illustration={figmaIllustration}
        headingLevel={3}
        heading="Symboler i Figma"
        description="Symboloversikt og symboler i flere varianter."
      />
      <ResourceLink
        href="https://www.figma.com/design/W4tl2t6G22muQfVF8jGeQX/Ikonbibliotek?node-id=9-2879&t=MlJwZ9DOmHhK8zuC-0"
        illustration={figmaIllustration}
        headingLevel={3}
        heading="Ikoner i Figma"
        description="Ikonoversikt og ikoner i flere varianter."
      />
    </div>
  );
}
