import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';
import { useRef } from 'react';
import { LanguageIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';
import { Dropdown } from 'src/components/dropdown/Dropdown';

export type LanguagePickerProps<TLang extends string> = {
  options: Record<TLang, string>;
  currentLanguage: TLang;
} & (
  | {
      type: 'button';
      getActionProps: (
        lang: TLang,
      ) => Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'data-size' | 'data-color'
      >;
    }
  | {
      type: 'a';
      getActionProps: (
        lang: TLang,
      ) => Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        'data-size' | 'data-color'
      >;
    }
) &
  HTMLAttributes<HTMLDivElement>;

export const LanguagePicker = <TLang extends string>({
  type,
  options,
  currentLanguage,
  getActionProps,
  ...props
}: LanguagePickerProps<TLang>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const languages = Object.keys(options) as TLang[];

  return (
    <div {...props}>
      <Button
        variant="tertiary"
        popoverTarget="language-picker"
        lang="en"
        ref={buttonRef}
      >
        <LanguageIcon aria-hidden />
        Language
      </Button>
      <Dropdown id="language-picker">
        <Dropdown.List>
          {languages.map((lang) => {
            const action =
              type === 'button'
                ? {
                    type: 'button' as const,
                    props: getActionProps(lang),
                  }
                : {
                    type: 'a' as const,
                    props: getActionProps(lang),
                  };

            return (
              <Dropdown.Item
                {...(currentLanguage === lang && { 'aria-current': true })}
              >
                {action.type === 'button' ? (
                  <Dropdown.Button
                    lang={lang}
                    {...action.props}
                    onClick={(e) => {
                      buttonRef.current?.focus();
                      buttonRef.current?.click();
                      action.props.onClick?.(e);
                    }}
                  >
                    {options[lang]}
                  </Dropdown.Button>
                ) : (
                  <Dropdown.Button asChild>
                    <a
                      lang={lang}
                      rel="alternate"
                      hrefLang={lang}
                      {...action.props}
                      onClick={(e) => {
                        buttonRef.current?.focus();
                        buttonRef.current?.click();
                        action.props?.onClick?.(e);
                      }}
                    >
                      {options[lang]}
                    </a>
                  </Dropdown.Button>
                )}
              </Dropdown.Item>
            );
          })}
        </Dropdown.List>
      </Dropdown>
    </div>
  );
};
