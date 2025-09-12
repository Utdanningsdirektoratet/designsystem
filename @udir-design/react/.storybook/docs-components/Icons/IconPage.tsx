import { useState } from 'react';
import { AkselIcon } from '@udir-design/icons/metadata';
import { useDebounceCallback } from '@digdir/designsystemet-react';
import { categorizeIcons, searchIcons } from './IconDisplay.utils';
import { IconPageSidebar } from './IconSidebar';
import { Search } from 'src/components/beta';
import { ToggleGroup } from 'src/components/alpha';
import styles from './icons.module.css';
import { IconDisplay } from './IconDisplay';

export const IconPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [iconToggle, setIconToggle] = useState<'fill' | 'stroke'>('stroke');
  const setSearchTermDebounced = useDebounceCallback(setSearchTerm, 500);
  const [selectedIcon, setSelectedIcon] = useState<AkselIcon | null>(null);

  function resetIcon() {
    setSelectedIcon(null);
  }

  const iconsWithCategories = categorizeIcons(
    searchIcons({ query: searchTerm ?? '', toggle: iconToggle ?? 'stroke' }),
  );

  return (
    <>
      <div className={styles.headerContent}>
        <form>
          <Search>
            <Search.Input
              aria-label="Søk"
              value={inputValue}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                // Don't search while typing
                setSearchTerm('');
                // Search after stopped typing
                setSearchTermDebounced(newValue);
              }}
            />
            <Search.Clear />
          </Search>
        </form>
        <ToggleGroup
          defaultValue="stroke"
          onChange={(value) => {
            setIconToggle(value as 'fill' | 'stroke');
          }}
        >
          <ToggleGroup.Item value="stroke">Outline</ToggleGroup.Item>
          <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
        </ToggleGroup>
      </div>
      <div className={styles.wrapper}>
        <IconDisplay
          icons={iconsWithCategories}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
        <div className={styles.infoSection}>
          <IconPageSidebar icon={selectedIcon} resetIcon={resetIcon} />
        </div>
      </div>
    </>
  );
};
