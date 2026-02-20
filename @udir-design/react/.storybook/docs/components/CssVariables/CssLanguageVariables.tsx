import { Unstyled } from '@storybook/addon-docs/blocks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Table } from 'src/components/table';
import styles from './CssLanguageVariables.module.css';

export const CssLanguageVariables = ({
  variables,
}: {
  variables: string[];
}) => {
  const langs = useMemo(() => ['nb', 'nn', 'en'] as const, []);
  type Lang = (typeof langs)[number];
  const enRef = useRef<HTMLDivElement>(null);
  const nbRef = useRef<HTMLDivElement>(null);
  const nnRef = useRef<HTMLDivElement>(null);
  const refs = useMemo(
    () => ({
      en: enRef,
      nb: nbRef,
      nn: nnRef,
    }),
    [],
  );
  const [computedStyle, setComputedStyle] = useState<
    Record<Lang, CSSStyleDeclaration | undefined>
  >({
    en: undefined,
    nb: undefined,
    nn: undefined,
  });

  useEffect(() => {
    const setForLang = (lang: Lang) =>
      setComputedStyle((prev) =>
        !prev[lang] && refs[lang].current
          ? { ...prev, [lang]: getComputedStyle(refs[lang].current) }
          : prev,
      );

    langs.forEach(setForLang);
  }, [langs, refs]);

  const getTranslation = (lang: Lang, variable: string) => {
    const langStyle = computedStyle[lang];
    if (!langStyle) return;
    return langStyle.getPropertyValue(variable);
  };

  return (
    <Unstyled>
      {langs.map((lang) => (
        <div style={{ display: 'none' }} lang={lang} ref={refs[lang]} />
      ))}

      <Table className={styles.languageVariables} border zebra>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            {langs.map((lang) => (
              <Table.HeaderCell>
                <code>lang="{lang}"</code>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {variables.map((variable) => (
            <Table.Row key={variable}>
              <Table.Cell>
                <code>{variable}</code>
              </Table.Cell>
              {langs.map((lang) => (
                <Table.Cell>{getTranslation(lang, variable) ?? ''}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Unstyled>
  );
};
