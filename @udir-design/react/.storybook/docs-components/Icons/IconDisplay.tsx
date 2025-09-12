import * as Icons from '@udir-design/icons';
import { AkselIcon } from '@udir-design/icons/metadata';
import { Button } from 'src/components/beta';
import { Heading, Paragraph } from 'src/components/alpha';
import styles from './icons.module.css';

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

type IconCategory = {
  category: string;
  icons: AkselIcon[];
};

export const IconDisplay = ({
  icons,
  selectedIcon,
  setSelectedIcon,
}: {
  icons: IconCategory[];
  selectedIcon: AkselIcon | null;
  setSelectedIcon: React.Dispatch<React.SetStateAction<AkselIcon | null>>;
}) => {
  return (
    <div className={styles.iconSection}>
      {icons.length === 0 && <Paragraph>Send innspill</Paragraph>}
      {icons.map((section) => {
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
    </div>
  );
};
