import {
  ComponentIcon,
  DocumentIcon,
  GithubIcon,
  JumpToIcon,
  StorybookIcon,
} from '@storybook/icons';
import React from 'react';
import {
  Button,
  TooltipLinkList,
  WithTooltip,
} from 'storybook/internal/components';
import type { PreviewAddon } from 'storybook/internal/csf';
import type { API_LeafEntry } from 'storybook/internal/types';
import {
  addons,
  types,
  useStorybookApi,
  useStorybookState,
} from 'storybook/manager-api';
import type { SourceCodeConfig } from '../utils/sourceCodeUrl';
import { getSourceLinks } from '../utils/sourceCodeUrl';

const ADDON_ID = 'udir/source-code-toolbar';
const TOOL_ID = `${ADDON_ID}/tool`;

const getLinkIcon = (label: string) => {
  const s = label.toLowerCase();

  if (s.includes('component')) return <ComponentIcon />;
  if (s.includes('stories')) return <StorybookIcon />;
  if (s.includes('documentation')) return <DocumentIcon />;
  if (s.includes('file')) return <DocumentIcon />;

  return <JumpToIcon />;
};

function SourceCodeTool() {
  const api = useStorybookApi();
  const { storyId } = useStorybookState();

  let currentStory: API_LeafEntry | undefined;

  if (storyId) {
    try {
      currentStory = api.getData(storyId) as API_LeafEntry;
    } catch {
      currentStory = undefined;
    }
  }

  const sourceCodeParameter =
    (currentStory?.parameters?.['sourceCode'] as
      | SourceCodeConfig
      | undefined) ?? api.getCurrentParameter<SourceCodeConfig>('sourceCode');

  const gitBranch = api.getGlobals()['gitBranch'];

  const sourceLinks = currentStory
    ? getSourceLinks(
        {
          story: currentStory,
          sourceCode: sourceCodeParameter,
        },
        gitBranch,
      )
    : [];

  const handleLinkClick = React.useCallback((href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  }, []);

  const hasLinks = sourceLinks.length > 0;

  const overlay = hasLinks ? (
    <TooltipLinkList
      links={sourceLinks.map((link) => ({
        id: link.href,
        title: link.label,
        icon: getLinkIcon(link.label),
        onClick: () => handleLinkClick(link.href),
      }))}
    />
  ) : (
    'Unable to resolve source code for this page'
  );

  return (
    <WithTooltip
      trigger="click"
      closeOnOutsideClick
      placement="bottom-start"
      tooltip={overlay}
    >
      <Button title="See source code" key={TOOL_ID} disabled={!hasLinks}>
        <GithubIcon /> <span>See source code</span>
      </Button>
    </WithTooltip>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'See source code',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <SourceCodeTool />,
  });
});

export type SourceCodeToolbarTypes = {
  parameters: {
    /** Source code link configuration */
    sourceCode?: SourceCodeConfig;
  };
  // Explicitly don't add typing for globals.gitBranch here, because we don't want it to be overridden
};

export function sourceCodeToolbarAddon(options: {
  gitBranch: string;
}): PreviewAddon<SourceCodeToolbarTypes> {
  return {
    initialGlobals: {
      gitBranch: options.gitBranch,
    },
  };
}
