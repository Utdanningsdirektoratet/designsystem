import { useState } from 'react';
import type { AkselIcon } from '@udir-design/icons/metadata';
import { Search } from 'src/components/search/Search';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { CategorizedIcons } from './CategorizedIcons';
import { categorizeIcons, searchIcons } from './IconDisplay.utils';
import { IconPageSidebar } from './IconSidebar';
import styles from './iconDisplay.module.css';

export const IconDisplay = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [iconToggle, setIconToggle] = useState<'fill' | 'stroke'>('stroke');
  const [selectedIcon, setSelectedIcon] = useState<AkselIcon | null>(null);

  function resetIcon() {
    setSelectedIcon(null);
  }

  const iconsWithCategories = categorizeIcons(
    searchIcons({ query: searchTerm, toggle: iconToggle }),
  );

  return (
    <div className={styles.root}>
      <div className={styles.filterSection}>
        <form>
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
      <div className={styles.iconSection}>
        <CategorizedIcons
          icons={iconsWithCategories}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
        <IconPageSidebar icon={selectedIcon} resetIcon={resetIcon} />
      </div>
    </div>
  );
};
