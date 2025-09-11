import { AkselIcon } from '@udir-design/icons/metadata';
import { Card, Dialog } from 'src/components/beta';
import { useEffect, useState } from 'react';
import { IconInformation } from './IconInformation';
import { PackageInformation } from './PackageInformation';

export function IconPageSidebar({
  icon,
  resetIcon,
}: {
  icon?: AkselIcon | null;
  resetIcon: () => void;
}) {
  const size = useWindowSize();

  if (size.width && size.width > 992) {
    return (
      <Card className="sidebar">
        {icon ? <IconInformation icon={icon} /> : <PackageInformation />}
      </Card>
    );
  }
  return (
    <Dialog
      onClose={() => resetIcon()}
      aria-label={icon ? `${icon.name} ikon` : 'Informasjon'}
      modal={false}
      open={Boolean(icon)}
      className="modal"
    >
      {icon ? <IconInformation icon={icon} /> : <PackageInformation />}
    </Dialog>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
