import { useEffect, useState } from 'react';
import { AkselIcon } from '@udir-design/icons/metadata';
import { Card } from 'src/components/card/Card';
import { Dialog } from 'src/components/dialog/Dialog';
import { IconInformation } from './IconInformation';
import { PackageInformation } from './PackageInformation';
import styles from './iconSidebar.module.css';

export function IconPageSidebar({
  icon,
  resetIcon,
}: {
  icon?: AkselIcon | null;
  resetIcon: () => void;
}) {
  const size = useWindowSize();

  if (icon && size.width < 992) {
    return (
      <Dialog
        onClose={() => resetIcon()}
        aria-label={`${icon.name} ikon`}
        modal={false}
        open={Boolean(icon)}
        className="modal"
      >
        <IconInformation icon={icon} />
      </Dialog>
    );
  }

  return (
    <Card className={styles.root}>
      {icon ? <IconInformation icon={icon} /> : <PackageInformation />}
    </Card>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 900,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
