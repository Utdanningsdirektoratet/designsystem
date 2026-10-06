import { useId, useMemo, useRef, useState } from 'react';
import { DownloadIcon } from '@udir-design/icons';
import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  Field,
  Heading,
  Label,
  Link,
  Paragraph,
  Search,
  Select,
  ToggleGroup,
} from '@udir-design/react';
import { CopyImageButton } from './CopyImageButton';
import {
  familyDisplayName,
  illustrationAssetUrl,
  isBinaryProperty,
  matchesFamilySearch,
  needsVariantChooser,
  propertyOptions,
  selectProperty,
  sortFamilies,
} from './gallery.utils';
import styles from './illustrationGallery.module.css';
import { categories } from './metadata';
import type { CategoryId, IllustrationCatalog } from './metadata';

export function IllustrationGallery({
  catalog,
  previewUrl = (item) => illustrationAssetUrl(item, 'svg'),
}: {
  catalog: IllustrationCatalog;
  /** Test fixtures can supply an empty image without requesting nonexistent artwork. */
  previewUrl?: (
    item: IllustrationCatalog['families'][number]['variants'][number],
  ) => string;
}) {
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0].id);
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState<{
    familyId: string;
    variantId: string;
  } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();
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
    matchesFamilySearch(item.name, query),
  );

  const selectCategory = (value: CategoryId) => {
    setCategoryId(value);
    setQuery('');
    setSelection(null);
  };

  if (catalog.state === 'pending-import') {
    return (
      <div className={styles.empty}>
        <Heading level={2}>Illustrasjonene er ikke importert ennå</Heading>
        <Paragraph>
          Katalogen venter på import av godkjente illustrasjoner. Det finnes
          foreløpig ingen forhåndsvisninger eller filer å laste ned.
        </Paragraph>
      </div>
    );
  }

  const content = (
    <div className={styles.content}>
      <output aria-live="polite" aria-atomic="true">
        Viser {families.length} av {availableFamilies.length}{' '}
        {availableFamilies.length === 1 ? 'illustrasjon' : 'illustrasjoner'}
      </output>
      {families.length === 0 ? (
        <div className={styles.empty}>
          <Heading level={2} data-size="sm">
            Ingen illustrasjoner å vise
          </Heading>
          <Paragraph>
            {query.trim()
              ? 'Ingen illustrasjonsfamilier passer til søket. Prøv et annet navn eller tøm søket.'
              : `Det er ikke importert illustrasjoner for ${categories.find((item) => item.id === categoryId)?.label ?? 'denne kategorien'} ennå.`}
          </Paragraph>
          {query.trim() ? (
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('');
                searchRef.current?.focus();
              }}
            >
              Tøm søket
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
                <img
                  src={previewUrl(representative)}
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
      <div className={styles.toolbar}>
        <ToggleGroup
          className={styles.categoryToggle}
          aria-label="Kategori"
          value={categoryId}
          onChange={(value) => {
            setCategoryId(value as CategoryId);
            setQuery('');
            setSelection(null);
          }}
        >
          {categories.map((item) => (
            <ToggleGroup.Item key={item.id} value={item.id}>
              {item.label}
            </ToggleGroup.Item>
          ))}
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
            {categories.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Field>
        <Search>
          <Search.Input
            ref={searchRef}
            id={searchId}
            name="illustrasjonssøk"
            aria-label="Søk"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Search.Button variant="secondary" />
          <Search.Clear />
        </Search>
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
              <div className={styles.details}>
                <div className={styles.previewPanel}>
                  <img
                    className={styles.preview}
                    src={previewUrl(variant)}
                    alt={`${familyDisplayName(family.name)}: ${variant.name}`}
                    decoding="async"
                    width={variant.width}
                    height={variant.height}
                  />
                  <div className={styles.previewFooter}>
                    <output className={styles.dimensions}>
                      {variant.width} × {variant.height} px
                    </output>
                    <CopyImageButton
                      key={variant.id}
                      url={illustrationAssetUrl(variant, 'png')}
                    />
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
                                {key}
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
                                    {value || '(Tom verdi)'}
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
                                label={key}
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
                      <Button asChild>
                        <a
                          href={illustrationAssetUrl(variant, 'png')}
                          download={`${variant.id}.png`}
                        >
                          <DownloadIcon aria-hidden />
                          <span>Last ned PNG</span>
                        </a>
                      </Button>
                      <Link
                        href={illustrationAssetUrl(variant, 'svg')}
                        download={variant.svg}
                      >
                        <DownloadIcon aria-hidden />
                        <span>Last ned SVG</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <Button
                variant="secondary"
                onClick={() => dialogRef.current?.close()}
              >
                Lukk
              </Button>
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
