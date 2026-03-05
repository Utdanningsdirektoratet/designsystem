import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';
import { useId, useRef } from 'react';
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
  const generatedId = useId();
  const id = props.id || generatedId;
  const dropdownId = id + '--dropdown';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languages = Object.keys(options) as TLang[];
  const isDropdownOpen = () =>
    dropdownRef?.current?.matches(':popover-open') || false;

  return (
    <div {...props} id={id}>
      <Button
        variant="tertiary"
        popoverTarget={dropdownId}
        lang="en"
        ref={buttonRef}
        onBlurCapture={(e) => {
          const next = e.relatedTarget;
          if (isDropdownOpen() && !dropdownRef.current?.contains(next)) {
            // Close dropdown when button loses focus, and new focus isn't within dropdown
            buttonRef.current?.click();
          }
        }}
      >
        <LanguageIcon aria-hidden />
        Language
      </Button>
      <Dropdown
        id={dropdownId}
        ref={dropdownRef}
        onBlurCapture={(e) => {
          const current = e.currentTarget;
          const next = e.relatedTarget;
          if (isDropdownOpen() && !current.contains(next)) {
            // Close dropdown when it loses focus
            buttonRef.current?.click();
          }
        }}
      >
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
