import * as Icons from '@udir-design/icons';
import { AkselIcon } from '@udir-design/icons/metadata';
import { Button, Card, Link, Heading, Paragraph } from 'src/components/beta';
import styles from './categorizedIcons.module.css';
import { Translations } from './Translations';

type CategoryWithIcons = {
  category: string;
  icons: AkselIcon[];
};

export const CategorizedIcons = ({
  icons,
  selectedIcon,
  setSelectedIcon,
}: {
  icons: CategoryWithIcons[];
  selectedIcon: AkselIcon | null;
  setSelectedIcon: React.Dispatch<React.SetStateAction<AkselIcon | null>>;
}) => {
  return (
    <div className={styles.iconSection}>
      {icons.length === 0 && <NoResults />}
      {icons.map((section) => {
        return (
          <div key={section.category}>
            <Heading level={2} data-size="md" className={styles.headings}>
              {Translations[section.category] ?? section.category}
            </Heading>
            <div className={styles.iconGrid}>
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

const NoResults = () => {
  return (
    <div>
      <Card className={styles.noResults}>
        <Card.Block className={styles.illustration}>
          <MagnifyingGlass />
        </Card.Block>
        <Card.Block className={styles.text}>
          <Heading level={2}>Ingen treff</Heading>
          <Paragraph>
            Prøv å justere filteret ditt. Om du fortsatt sitter igjen tomhendt
            kan du kontakte oss på{' '}
            <Link href="mailto:designteamet@udir.no">e-post</Link> eller slack{' '}
            <Link href="https://udir.slack.com/archives/C06G2E50HF0">
              #designsystem-udir
            </Link>{' '}
            så ser vi på det sammen.
          </Paragraph>
        </Card.Block>
      </Card>
    </div>
  );
};

const MagnifyingGlass = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.344 14.7056C40.0925 16.9371 42.133 22.5955 39.9015 27.3441C37.67 32.0926 32.0116 34.133 27.2631 31.9015C22.5146 29.67 20.4741 24.0116 22.7056 19.2631C24.9371 14.5146 30.5955 12.4742 35.344 14.7056Z"
        fill="#C8DEF0"
        stroke="#303030"
        stroke-miterlimit="10"
      />
      <path
        d="M26.356 17.7173C25.1729 18.5922 23.4972 20.8221 23.9107 23.7338"
        stroke="#303030"
        stroke-width="0.4"
        stroke-linecap="round"
      />
      <path
        d="M26.161 19.509C25.242 20.3507 24.3736 21.8382 24.9476 24.3574"
        stroke="#303030"
        stroke-width="0.4"
        stroke-linecap="round"
      />
      <path
        d="M36.4793 31.8768L42.7489 49.6004C42.8963 50.0169 42.6782 50.4738 42.2617 50.6211L40.3762 51.2881C39.9596 51.4355 39.5028 51.2174 39.3554 50.8008L33.0857 33.0773L36.4793 31.8768Z"
        fill="#76C69D"
        stroke="#303030"
        stroke-width="0.4"
      />
    </svg>
  );
};
