import { useState } from 'react';
import { Search } from 'src/components/search/Search';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { CategorizedIcons } from './CategorizedIcons';
import type { UdirIcon } from './IconDisplay.utils';
import {
  categorizeIcons,
  getUdirPreferredIcons,
  searchIcons,
} from './IconDisplay.utils';
import { IconPageSidebar } from './IconSidebar';
import styles from './iconDisplay.module.css';

export const IconDisplay = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [iconToggle, setIconToggle] = useState<'fill' | 'stroke'>('stroke');
  const [selectedIcon, setSelectedIcon] = useState<UdirIcon | null>(null);

  const iconsWithCategories = categorizeIcons(
    searchIcons({ query: searchTerm, toggle: iconToggle }),
  );
  const udirPreferredIcons = getUdirPreferredIcons(iconsWithCategories);

  const allIconsWithCategories = [
    ...udirPreferredIcons,
    ...iconsWithCategories,
  ];

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
          icons={allIconsWithCategories}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
        <IconPageSidebar
          icon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>
    </div>
  );
};
