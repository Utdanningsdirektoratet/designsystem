import { create } from 'storybook/theming';
import { colors } from '@udir-design/theme/colors';

const { accent, neutral } = colors.light;

export default create({
  // Render brandTitle as HTML (with logo img + text) instead of using brandImage,
  // so the text renders in Inter from the page rather than a system font inside an <img> SVG.
  brandImage: null as unknown as string,
  brandTitle: `
    <div class="uds-sb-brand">
      <img src="./img/udir-circle-logo.svg" alt="" />
      <span>Designsystem</span>
    </div>
  `,
  fontBase: '"Inter", sans-serif',
  // Colors
  base: 'light',
  colorPrimary: accent.border.default,
  colorSecondary: neutral.text.default,
  barTextColor: neutral.text.default,
  barHoverColor: accent.surface.hover,
  barSelectedColor: neutral.text.default,
  textColor: neutral.text.default,
  inputTextColor: neutral.text.subtle,
  appBg: neutral.background.tinted,
  appHoverBg: accent.surface.hover,
  appPreviewBg: neutral.background.default,
  appContentBg: neutral.background.default,
});
