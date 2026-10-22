import type { ComponentDocumentationEntry } from './.storybook/utils/componentDocumentation';

declare global {
  const __GIT_BRANCH__: string;
  const __COMPONENT_DOCUMENTATION__: readonly ComponentDocumentationEntry[];
}
