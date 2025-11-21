import { useState } from 'react';
import { Search } from 'src/components/search/Search';
import { CategorizedSymbols } from './CategorizedSymbols';
import type { UdirSymbol } from './SymbolDisplay.utils';
import { categorizeSymbols } from './SymbolDisplay.utils';
import { searchSymbols } from './SymbolDisplay.utils';
import { SymbolPageSidebar } from './SymbolSidebar';
import styles from './symbolDisplay.module.css';

export const SymbolDisplay = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSymbol, setSelectedSymbol] = useState<UdirSymbol | null>(null);

  const symbolsWithCategories = categorizeSymbols(
    searchSymbols({ query: searchTerm }),
  );

  const allSymbolsWithCategories = [...symbolsWithCategories];

  return (
    <div className={styles.root}>
      <div className={styles.filterSection}>
        <div>
          <Search>
            <Search.Input
              aria-label="Søk"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Search.Clear />
          </Search>
        </div>
      </div>
      <div className={styles.symbolSection}>
        <CategorizedSymbols
          symbols={allSymbolsWithCategories}
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
        />
        <SymbolPageSidebar
          symbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
        />
      </div>
    </div>
  );
};
