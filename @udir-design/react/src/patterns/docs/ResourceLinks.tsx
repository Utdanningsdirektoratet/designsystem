import {
  BellFillIcon,
  BellIcon,
  ExclamationmarkTriangleFillIcon,
  ExclamationmarkTriangleIcon,
  LaptopFillIcon,
  LaptopIcon,
  LinkIcon,
  PadlockLockedFillIcon,
  PadlockLockedIcon,
  ShieldLockFillIcon,
  ShieldLockIcon,
  TableFillIcon,
  TableIcon,
  TasklistFillIcon,
  TasklistIcon,
} from '@udir-design/icons';
import { getPath } from '.storybook/docs/components/StorybookLink';
import { ResourceLinkHorizontal } from 'src/docs/ResourceLinks';
import styles from '../../docs/ResourceLinks.module.css';

export function PatternsResourceLinks() {
  return (
    <div className={styles.resourceLinks}>
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-tabeller--docs')}
        icon={<TableIcon aria-hidden />}
        activeIcon={<TableFillIcon aria-hidden />}
        headingLevel={3}
        heading="Tabeller"
        description="Visning, sortering og filtrering av tabeller"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-demoversjon-av-tjenester--docs')}
        icon={<LaptopIcon aria-hidden />}
        activeIcon={<LaptopFillIcon aria-hidden />}
        headingLevel={3}
        heading="Demoversjon av tjenester"
        description="Merking av demo- og testversjoner"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-disabled-og-readonly--docs')}
        icon={<PadlockLockedIcon aria-hidden />}
        activeIcon={<PadlockLockedFillIcon aria-hidden />}
        headingLevel={3}
        heading="Disabled og ReadOnly"
        description="Alternativer til deaktiverte og skrivebeskyttede felt"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-feilmeldinger--docs')}
        icon={<ExclamationmarkTriangleIcon aria-hidden />}
        activeIcon={<ExclamationmarkTriangleFillIcon aria-hidden />}
        headingLevel={3}
        heading="Feilmeldinger"
        description="Forebygging og håndtering av feil"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-informasjonskapsler--docs')}
        icon={<ShieldLockIcon aria-hidden />}
        activeIcon={<ShieldLockFillIcon aria-hidden />}
        headingLevel={3}
        heading="Informasjonskapsler"
        description="Informasjon og brukervalg for informasjonskapsler"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-merking-av-lenker--docs')}
        icon={<LinkIcon aria-hidden />}
        headingLevel={3}
        heading="Merking av lenker"
        description="Lenketekster og merking av ulike lenketyper"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-obligatoriske-felt--docs')}
        icon={<TasklistIcon aria-hidden />}
        activeIcon={<TasklistFillIcon aria-hidden />}
        headingLevel={3}
        heading="Obligatoriske felt"
        description="Merking av obligatoriske og valgfrie skjemafelt"
      />
      <ResourceLinkHorizontal
        href={getPath('/docs/patterns-systemvarsler--docs')}
        icon={<BellIcon aria-hidden />}
        activeIcon={<BellFillIcon aria-hidden />}
        headingLevel={3}
        heading="Systemvarsler"
        description="Varsling om systemfeil og viktige hendelser"
      />
    </div>
  );
}
