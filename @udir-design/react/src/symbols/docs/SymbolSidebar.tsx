import type { Dispatch, SetStateAction } from 'react';
import { Card } from 'src/components/card/Card';
import { Dialog } from 'src/components/dialog/Dialog';
import { PackageInformation } from './PackageInformation';
import type { UdirSymbol } from './SymbolDisplay.utils';
import { SymbolInformation } from './SymbolInformation';
import styles from './symbolSidebar.module.css';

export function SymbolPageSidebar({
  symbol,
  setSelectedSymbol,
}: {
  symbol?: UdirSymbol | null;
  setSelectedSymbol: Dispatch<SetStateAction<UdirSymbol | null>>;
}) {
  if (!symbol) {
    return (
      <Card className={styles.card}>
        <PackageInformation />
      </Card>
    );
  }

  return (
    <>
      {/* Hidden on smaller screens */}
      <Card className={`${styles.card} ${styles.symbol}`}>
        <SymbolInformation symbol={symbol} />
      </Card>
      {/* Hidden on bigger screens */}
      <Dialog
        onClose={() => setSelectedSymbol(null)}
        aria-label={`${symbol.name} ikon`}
        modal={false}
        open={Boolean(symbol)}
        className={styles.dialog}
      >
        <SymbolInformation symbol={symbol} />
      </Dialog>
    </>
  );
}
