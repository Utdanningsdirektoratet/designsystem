import React, { useState } from 'react';
import * as Icons from '@udir-design/icons/src/index';
import meta, { AkselIcon } from '@udir-design/icons/src/metadata';
import { Search } from './components/beta';
import { ToggleGroup, Heading } from './components/alpha';
import { useDebounceCallback } from '@digdir/designsystemet-react';

const Translations = {
  Accessibility: 'Tilgjenglighet',
  Arrows: 'Piler',
  Development: 'Utvikling',
  'Files and application': 'Filer og applikasjoner',
  Home: 'Hjem',
  Interface: 'Brukerflate',
  'Law and security': 'Lover og sikkerhet',
  Media: 'Media',
  Money: 'Penger',
  'Nature and animals': 'Natur og dyr',
  People: 'Mennesker',
  'Statistics and math': 'Statistikk og matte',
  Status: 'Status',
  Transportation: 'Transport',
  Wellness: 'Velvære',
  Workplace: 'Arbeidsplass',
};

export const IconDisplay = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const setSearchTermDebounced = useDebounceCallback(setSearchTerm, 500);

  const categories = Array.from(
    new Set(Object.values(meta).map((icon) => icon.category)),
  );

  const iconData = React.useMemo(() => {
    const result = Object.entries(Icons).map(([key, Value]) => {
      const name = key.replace('Icon', '');
      const metadata = meta[name as keyof typeof meta];

      if (!metadata) {
        console.warn(`No metadata found for icon: ${name}`);
      }

      return {
        ...metadata,
        key,
        Value,
      };
    });
    return result;
  }, []);

  const [filteredList, setFilteredList] = useState([]);

  const outlineIcons = iconData.filter(
    (item) => item.variant.toLowerCase() === 'stroke',
  );
  const fillIcons = iconData.filter(
    (item) => item.variant.toLowerCase() === 'fill',
  );

  function categorizeIcons(icons: AkselIcon[]): {
    category: string;
    icons: AkselIcon[];
  }[] {
    const categoryMap = new Map<string, AkselIcon[]>();

    for (const icon of icons) {
      const category = categoryMap.get(icon.category);
      if (!category) {
        categoryMap.set(icon.category, [icon]);
      } else {
        category.push(icon);
      }
    }

    return Array.from(categoryMap.entries())
      .map(([category, _icons]) => ({ category, icons: _icons }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }

  const test = categorizeIcons(
    Object.entries(meta).map(([key, Value]) => {
      return Value;
    }),
  );

  console.log(test);

  const [list, setList] = useState(outlineIcons);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-size-6)',
          marginBottom: 'var(--ds-size-10)',
          marginTop: 'var(--ds-size-6)',
        }}
      >
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
          defaultValue="outline"
          onChange={(value) => {
            value === 'fill' ? setList(fillIcons) : setList(outlineIcons);
          }}
        >
          <ToggleGroup.Item value="outline">Outline</ToggleGroup.Item>
          <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
        </ToggleGroup>
      </div>
      {categories.map((category) => (
        <>
          <Heading>{Translations[category] ?? category}</Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, auto)',
              gap: 'var(--ds-size-4)',
            }}
          >
            {list
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .filter((item) => item.category === category)
              .map((icon) => (
                <React.Fragment key={icon.key}>
                  <icon.Value fontSize="3rem" aria-hidden title={icon.key} />
                </React.Fragment>
              ))}
          </div>
        </>
      ))}
    </div>
  );
};
