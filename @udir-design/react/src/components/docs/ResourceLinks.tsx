import { useState } from 'react';
import { getPath } from '.storybook/docs/components/StorybookLink';
import { Card } from 'src/components/card';
import { Chip } from 'src/components/chip';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { figmaIllustration, ResourceLinkCompact } from 'src/docs/ResourceLinks';
import styles from '../../docs/ResourceLinks.module.css';

export function ComponentResourceLinks() {
  const categories = [
    ...new Set(
      __COMPONENT_DOCUMENTATION__.flatMap(({ categories }) => categories),
    ),
  ];
  type Category = (typeof categories)[number];
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const visibleComponents = __COMPONENT_DOCUMENTATION__
    .filter(
      ({ categories }) =>
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => categories.includes(category)),
    )
    .toSorted((a, b) => a.name.localeCompare(b.name, 'nb'));

  const toggleCategory = (category: Category, checked: boolean) => {
    setSelectedCategories((current) =>
      checked
        ? [...current, category]
        : current.filter((selected) => selected !== category),
    );
  };

  return (
    <div className={styles.componentResourceLinks}>
      <fieldset
        className={styles.componentResourceFilters}
        aria-labelledby="component-category-filter"
      >
        <Heading level={3} data-size="xs" id="component-category-filter">
          Filtrer på kategori
        </Heading>
        <div className={styles.componentResourceFilterOptions}>
          {categories.map((category) => (
            <Chip.Checkbox
              checked={selectedCategories.includes(category)}
              key={category}
              name="component-category"
              onChange={(event) =>
                toggleCategory(category, event.currentTarget.checked)
              }
              value={category}
            >
              {category}
            </Chip.Checkbox>
          ))}
        </div>
        <Paragraph data-size="sm" aria-live="polite">
          Viser {visibleComponents.length} av{' '}
          {__COMPONENT_DOCUMENTATION__.length} komponenter
        </Paragraph>
      </fieldset>
      <div className={styles.componentResourceLinkGrid}>
        {visibleComponents.map(({ docsId, name }) => (
          <ResourceLinkCompact
            key={docsId}
            href={getPath(`/docs/${docsId}`)}
            headingLevel={3}
            heading={name}
          />
        ))}
      </div>
    </div>
  );
}

export function ComponentResourceLink() {
  return (
    <Card className={styles.horizontalCard}>
      <Card.Block className={styles.illustration} style={{ height: 150 }}>
        {figmaIllustration}
      </Card.Block>
      <Card.Block>
        <Heading level={2}>
          <a href="https://www.figma.com/design/6cS3POn7y9Zost26ofJh0a/Komponentbibliotek--beta-?m=auto&node-id=4-476&t=m9jA1aHGUTH3tuve-1">
            Komponenter i Figma
          </a>
        </Heading>
        <Paragraph style={{ lineBreak: 'auto' }}>
          Oversikten over komponentene finnes også tilgjengelig i Figma.
        </Paragraph>
      </Card.Block>
    </Card>
  );
}
