import { useState } from 'react';
import * as Icons from '@udir-design/icons';
import { AkselIcon } from '@udir-design/icons/metadata';
import { useDebounceCallback } from '@digdir/designsystemet-react';
import { categorizeIcons, searchIcons } from './IconDisplay.utils';
import { IconPageSidebar } from './IconSidebar';
import { Button, Search } from 'src/components/beta';
import { ToggleGroup, Heading, Paragraph } from 'src/components/alpha';

const Translations: Record<string, string> = {
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
          defaultValue="stroke"
          onChange={(value) => {
            setIconToggle(value as 'fill' | 'stroke');
          }}
        >
          <ToggleGroup.Item value="stroke">Outline</ToggleGroup.Item>
          <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
        </ToggleGroup>
      </div>
      {iconsWithCategories.length === 0 && <Paragraph>Send innspill</Paragraph>}
      {iconsWithCategories.map((section) => {
        return (
          <div key={section.category}>
            <Heading
              level={2}
              data-size="lg"
              data-aksel-heading-color
              style={{ marginTop: 'var(--ds-size-6)' }}
            >
              {Translations[section.category] ?? section.category}
            </Heading>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexGrow: '1',
                gap: 'var(--ds-size-4)',
              }}
            >
              {section.icons.map((icon) => {
                const Value = Icons[`${icon.id}Icon` as keyof typeof Icons];
                if (Value === undefined) {
                  return null;
                }
                return (
                  <Button
                    key={icon.id}
                    variant="tertiary"
                    data-size="lg"
                    onClick={() => {
                      selectedIcon === icon
                        ? setSelectedIcon(null)
                        : setSelectedIcon(icon);
                    }}
                  >
                    <Value aria-hidden title={icon.id} />
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
      <IconPageSidebar icon={selectedIcon} resetIcon={resetIcon} />
    </div>
  );
};
