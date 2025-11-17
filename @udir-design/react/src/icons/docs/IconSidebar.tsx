import type { Dispatch, SetStateAction } from 'react';
import { Card } from 'src/components/card/Card';
import { Dialog } from 'src/components/dialog/Dialog';
import type { UdirIcon } from './IconDisplay.utils';
import { IconInformation } from './IconInformation';
import { PackageInformation } from './PackageInformation';
import styles from './iconSidebar.module.css';

export function IconPageSidebar({
  icon,
  setSelectedIcon,
}: {
  icon?: UdirIcon | null;
  setSelectedIcon: Dispatch<SetStateAction<UdirIcon | null>>;
}) {
  if (!icon) {
    return (
      <Card className={styles.card}>
        <PackageInformation />
      </Card>
    );
  }

  return (
    <>
      {/* Hidden on smaller screens */}
      <Card className={`${styles.card} ${styles.icon}`}>
        <IconInformation icon={icon} />
      </Card>
      {/* Hidden on bigger screens */}
      <Dialog
        onClose={() => setSelectedIcon(null)}
        aria-label={`${icon.name} ikon`}
        modal={false}
        open={Boolean(icon)}
        className={styles.dialog}
      >
        <IconInformation icon={icon} />
      </Dialog>
    </>
  );
}
