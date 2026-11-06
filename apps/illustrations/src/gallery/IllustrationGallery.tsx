import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { DownloadIcon } from '@udir-design/icons';
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  Dialog,
  Divider,
  Field,
  Heading,
  Label,
  Link,
  Paragraph,
  Select,
  Tag,
  ToggleGroup,
} from '@udir-design/react';
import { Suggestion } from '@udir-design/react/alpha';
import { useAssetLinkProps, useAssetSource } from '../assets';
import { categories } from '../metadata';
import type {
  CategoryId,
  IllustrationCatalog,
  IllustrationVariant,
} from '../metadata';
import { AssetImage } from './AssetImage';
import { CopyImageButton } from './CopyImageButton';
import {
  countMatchesByCategory,
  familyDisplayName,
  familyFilterOptions,
  isBinaryProperty,
  matchesFilter,
  needsVariantChooser,
  propertyDisplayLabel,
  propertyOptions,
  propertyValueDisplayLabel,
  resultsSummary,
  searchSummaryParts,
  selectProperty,
  sortFamilies,
} from './gallery.utils';
import styles from './illustrationGallery.module.css';

// Maps Fargetema to the theme color it is drawn for (see design-tokens config).
const fargetemaColors: Record<string, string> = {
  grønn: 'accent',
  blå: 'support1',
  brun: 'support2',
};

function PngDownload({ variant }: { variant: IllustrationVariant }) {
  const props = useAssetLinkProps(variant, 'png');
  return (
    <Button asChild>
      <a {...props}>
        <DownloadIcon aria-hidden />
        <span>Last ned PNG</span>
      </a>
    </Button>
  );
}

function SvgDownload({ variant }: { variant: IllustrationVariant }) {
  const props = useAssetLinkProps(variant, 'svg');
  return <Link {...props}>Last ned SVG</Link>;
}

export function IllustrationGallery({
  catalog,
}: {
  catalog: IllustrationCatalog;
}) {
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0].id);
  const [filter, setFilter] = useState('');
  const [selection, setSelection] = useState<{
    familyId: string;
    variantId: string;
  } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const filterId = useId();
  const titleId = useId();
  const fieldId = useId();
  const categorySelectId = useId();
  const family = catalog.families.find(
    (item) => item.id === selection?.familyId,
  );
  const variant =
    family?.variants.find((item) => item.id === selection?.variantId) ??
    family?.variants[0];
  const options = family
    ? propertyOptions(family)
        .filter(({ values }) => values.length > 1)
        .map(({ key, values }) => ({
          key,
          values,
          binary: isBinaryProperty(family, key, values),
        }))
    : [];
  const showVariantChooser = family ? needsVariantChooser(family) : false;
  // The note only makes sense when the user can pick between color themes.
  const hasFargetemaChoice = options.some(({ key }) => key === 'Fargetema');
  const themeColor =
    hasFargetemaChoice && variant?.properties.Bakgrunn === 'Nei'
      ? fargetemaColors[variant.properties.Fargetema]
      : undefined;
  const source = useAssetSource();

  // Warms the cache so switching options never waits on the network.
  useEffect(() => {
    if (!family || source.directUrl) return;
    for (const item of family.variants.slice(0, 20))
      source.url(item, 'svg').catch(() => {});
  }, [family, source]);
  const availableFamilies = useMemo(
    () =>
      sortFamilies(
        catalog.families.filter(
          (item) => item.categoryId === categoryId && item.variants.length > 0,
        ),
      ),
    [catalog.families, categoryId],
  );
  const families = availableFamilies.filter((item) =>
    matchesFilter(item, filter),
  );

  // Which categories each option (name prefix or tag) appears in, so suggestions can say where it belongs.
  const optionCategories = useMemo(() => {
    const map = new Map<string, Set<CategoryId>>();
    for (const item of catalog.families) {
      if (item.variants.length === 0) continue;
      for (const option of familyFilterOptions(item)) {
        const ids = map.get(option) ?? new Set<CategoryId>();
        ids.add(item.categoryId as CategoryId);
        map.set(option, ids);
      }
    }
    return map;
  }, [catalog.families]);

  // Options from the current category first, then the rest, each group alphabetical.
  const filterOptions = [...optionCategories]
    .map(([option, ids]) => ({ option, inCategory: ids.has(categoryId) }))
    .sort(
      (a, b) =>
        Number(b.inCategory) - Number(a.inCategory) ||
        a.option.localeCompare(b.option, 'nb'),
    );

  const hitCounts = useMemo(() => {
    const counts = countMatchesByCategory(catalog.families, filter);
    return new Map(counts.map((item) => [item.categoryId, item.count]));
  }, [catalog.families, filter]);
  const otherCategoryHits = categories.flatMap(({ id, label }) => {
    const count = hitCounts.get(id);
    return count && id !== categoryId ? [{ id, label, count }] : [];
  });

  const selectCategory = (value: CategoryId) => {
    setCategoryId(value);
    setSelection(null);
  };

  const selectFilter = (tag: string) => {
    setFilter(tag);
    setSelection(null);
    dialogRef.current?.close();
    filterRef.current?.focus();
  };

  const clearFilter = () => {
    setFilter('');
    filterRef.current?.focus();
  };

  if (catalog.state === 'pending-import') {
    return (
      <div className={styles.empty}>
        <Heading level={1} data-size="lg">
          Illustrasjonene er ikke importert ennå
        </Heading>
        <Paragraph>
          Katalogen venter på import av godkjente illustrasjoner. Det finnes
          foreløpig ingen forhåndsvisninger eller filer å laste ned.
        </Paragraph>
      </div>
    );
  }

  const categoryLabel =
    categories.find((item) => item.id === categoryId)?.label ?? '';
  const summaryParts = searchSummaryParts(families.length, categoryLabel);

  const content = (
    <div className={styles.content}>
      <div className={styles.summary}>
        <output
          className={filter ? styles.visuallyHidden : undefined}
          aria-live="polite"
          aria-atomic="true"
        >
          {resultsSummary(families.length, filter, categoryLabel)}
        </output>
        {filter ? (
          <>
            <span aria-hidden>{summaryParts.before}</span>
            <Chip.Removable
              data-size="sm"
              aria-label={`Fjern valget ${filter}`}
              title={`Fjern valget ${filter}`}
              onClick={clearFilter}
            >
              <span className={styles.searchTerm}>{filter}</span>
            </Chip.Removable>
            <span aria-hidden>{summaryParts.after}</span>
          </>
        ) : null}
      </div>
      {families.length === 0 ? (
        <div className={styles.empty}>
          <Heading level={2} data-size="sm">
            Ingen illustrasjoner å vise i denne kategorien
          </Heading>
          <Paragraph>
            {filter
              ? otherCategoryHits.length > 0
                ? 'Ingen illustrasjoner i denne kategorien passer til valget, men det finnes treff i andre kategorier.'
                : 'Ingen illustrasjoner passer til valget. Velg et annet stikkord eller fjern valget.'
              : `Det er ikke importert illustrasjoner for ${categories.find((item) => item.id === categoryId)?.label ?? 'denne kategorien'} ennå.`}
          </Paragraph>
          {otherCategoryHits.length > 0 ? (
            <div className={styles.otherHits}>
              {otherCategoryHits.map(({ id, label, count }) => (
                <Button
                  key={id}
                  variant="secondary"
                  onClick={() => selectCategory(id)}
                >
                  {count} treff i {label}
                </Button>
              ))}
            </div>
          ) : null}
          {filter ? (
            <Button variant="secondary" onClick={clearFilter}>
              Fjern valg
            </Button>
          ) : null}
        </div>
      ) : null}
      <ul className={styles.grid}>
        {families.map((item) => {
          const representative = item.variants[0];
          return (
            <li key={item.id}>
              <button
                type="button"
                className={styles.card}
                aria-haspopup="dialog"
                aria-label={familyDisplayName(item.name)}
                onClick={() => {
                  setSelection({
                    familyId: item.id,
                    variantId: representative.id,
                  });
                  dialogRef.current?.showModal();
                }}
              >
                <AssetImage
                  variant={representative}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={representative.width}
                  height={representative.height}
                />
                <span>{familyDisplayName(item.name)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <Paragraph data-size="lg" className={styles.introText}>
          Illustrasjonene er laget for å bidra til helhetlig design i Udirs
          tjenester og kanaler. Klikk på illustrasjonen for å velge farge,
          bakgrunn og format.
        </Paragraph>
      </div>
      <div className={styles.toolbar} data-hits={hitCounts.size > 0}>
        <ToggleGroup
          className={styles.categoryToggle}
          aria-label="Kategori"
          value={categoryId}
          onChange={(value) => selectCategory(value as CategoryId)}
        >
          {categories.map((item) => {
            const count = hitCounts.get(item.id);
            return (
              <ToggleGroup.Item key={item.id} value={item.id}>
                {item.label}
                {filter && count ? <Badge count={count} maxCount={99} /> : null}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup>
        <Field className={styles.categorySelect}>
          <Label htmlFor={categorySelectId}>Kategori</Label>
          <Select
            id={categorySelectId}
            value={categoryId}
            onChange={(event) =>
              selectCategory(event.target.value as CategoryId)
            }
          >
            {categories.map((item) => {
              const count = hitCounts.get(item.id);
              return (
                <Select.Option key={item.id} value={item.id}>
                  {count ? `${item.label} (${count} treff)` : item.label}
                </Select.Option>
              );
            })}
          </Select>
        </Field>
        <Suggestion
          className={styles.search}
          selected={filter}
          onSelectedChange={(item) => setFilter(item?.value ?? '')}
        >
          <Suggestion.Input
            ref={filterRef}
            id={filterId}
            name="illustrasjonsfilter"
            aria-label="Filtrer på stikkord"
            placeholder="Søk på filter"
          />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Ingen treff</Suggestion.Empty>
            {filterOptions.map(({ option, inCategory }) => (
              <Suggestion.Option key={option} label={option} value={option}>
                {option}
                {inCategory ? null : (
                  <span className={styles.tagHint}>
                    Treff i andre kategorier
                  </span>
                )}
              </Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </div>
      {content}
      <Dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        closeButton="Lukk illustrasjonsdetaljer"
        className={styles.dialog}
        closedby="any"
      >
        {family && variant ? (
          <>
            <div>
              <Heading level={2} id={titleId}>
                {familyDisplayName(family.name)}
              </Heading>
              {family.tags?.length ? (
                <ul className={styles.tags} aria-label="Stikkord">
                  {family.tags.map((tag) => (
                    <li key={tag}>
                      <Tag asChild data-size="sm" variant="outline">
                        <button type="button" onClick={() => selectFilter(tag)}>
                          {tag}
                        </button>
                      </Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className={styles.details}>
                <div className={styles.previewPanel}>
                  <div className={styles.previewFrame} data-color={themeColor}>
                    {themeColor ? (
                      <Paragraph className={styles.previewNote} data-size="xs">
                        Sjekk at illustrasjonen harmonerer med bakgrunnen du
                        bruker
                      </Paragraph>
                    ) : null}
                    <AssetImage
                      className={styles.preview}
                      variant={variant}
                      alt={`${familyDisplayName(family.name)}: ${variant.name}`}
                      decoding="async"
                      width={variant.width}
                      height={variant.height}
                    />
                  </div>
                  <div className={styles.previewFooter}>
                    <output className={styles.dimensions}>
                      {variant.width} × {variant.height} px
                    </output>
                    <CopyImageButton key={variant.id} variant={variant} />
                  </div>
                </div>
                <div className={styles.controls}>
                  {options.length > 0 || showVariantChooser ? (
                    <div className={styles.controlSection}>
                      <Heading level={3} data-size="xs">
                        Tilpass illustrasjonen
                      </Heading>
                      <div className={styles.selects}>
                        {options
                          .filter(({ binary }) => !binary)
                          .map(({ key, values }, index) => (
                            <Field key={key}>
                              <Label htmlFor={`${fieldId}-${index}`}>
                                {propertyDisplayLabel(key)}
                              </Label>
                              <Select
                                id={`${fieldId}-${index}`}
                                value={
                                  variant.properties[key] === undefined
                                    ? 'missing'
                                    : `value:${variant.properties[key]}`
                                }
                                onChange={(event) => {
                                  const next = selectProperty(
                                    family,
                                    variant,
                                    key,
                                    event.target.value.slice('value:'.length),
                                  );
                                  setSelection({
                                    familyId: family.id,
                                    variantId: next.id,
                                  });
                                }}
                              >
                                {variant.properties[key] === undefined ? (
                                  <Select.Option value="missing" disabled>
                                    Ikke angitt
                                  </Select.Option>
                                ) : null}
                                {values.map((value) => (
                                  <Select.Option
                                    key={value}
                                    value={`value:${value}`}
                                  >
                                    {value
                                      ? propertyValueDisplayLabel(value)
                                      : '(Tom verdi)'}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Field>
                          ))}
                        {showVariantChooser ? (
                          <Field>
                            <Label htmlFor={`${fieldId}-variant`}>
                              Variant
                            </Label>
                            <Select
                              id={`${fieldId}-variant`}
                              value={variant.id}
                              onChange={(event) =>
                                setSelection({
                                  familyId: family.id,
                                  variantId: event.target.value,
                                })
                              }
                            >
                              {family.variants.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name} ({item.id})
                                </Select.Option>
                              ))}
                            </Select>
                          </Field>
                        ) : null}
                      </div>
                      {options.some(({ binary }) => binary) ? (
                        <div className={styles.checkboxes}>
                          {options
                            .filter(({ binary }) => binary)
                            .map(({ key }) => (
                              <Checkbox
                                key={key}
                                label={propertyDisplayLabel(key)}
                                checked={variant.properties[key] === 'Ja'}
                                onChange={(event) => {
                                  const next = selectProperty(
                                    family,
                                    variant,
                                    key,
                                    event.target.checked ? 'Ja' : 'Nei',
                                  );
                                  setSelection({
                                    familyId: family.id,
                                    variantId: next.id,
                                  });
                                }}
                              />
                            ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <Divider />
                  <div className={styles.controlSection}>
                    <Heading level={3} data-size="xs">
                      Last ned
                    </Heading>
                    <div className={styles.downloads}>
                      <PngDownload variant={variant} />
                      <Paragraph data-size="sm" data-color="neutral">
                        Trenger du en skalerbar fil til design eller utvikling?{' '}
                        <SvgDownload variant={variant} />.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Heading level={2} id={titleId}>
            Illustrasjonsdetaljer
          </Heading>
        )}
      </Dialog>
    </div>
  );
}
