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
  useChannel,
  useStorybookApi,
  useStorybookState,
} from 'storybook/manager-api';
import type { SourceCodeConfig } from '../utils/sourceCodeUrl';
import {
  SOURCE_CODE_CHANNEL_EVENT,
  getSourceLinks,
} from '../utils/sourceCodeUrl';

const ADDON_ID = 'udir/source-code-toolbar';
const TOOL_ID = `${ADDON_ID}/tool`;

function getGitBranchFromStory(
  currentStory: API_LeafEntry | undefined,
): string | undefined {
  return currentStory?.parameters?.['sourceCode']?.['gitBranch'];
}

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

  const [channelConfig, setChannelConfig] =
    React.useState<SourceCodeConfig | null>(null);

  useChannel({
    [SOURCE_CODE_CHANNEL_EVENT]: (config: SourceCodeConfig | null) =>
      setChannelConfig(config),
  });

  let currentStory: API_LeafEntry | undefined;

  if (storyId) {
    try {
      currentStory = api.getData(storyId) as API_LeafEntry;
    } catch {
      currentStory = undefined;
    }
  }

  const storeParameter =
    (currentStory?.parameters?.['sourceCode'] as
      | SourceCodeConfig
      | undefined) ?? api.getCurrentParameter<SourceCodeConfig>('sourceCode');

  const sourceCodeParameter: SourceCodeConfig | undefined = channelConfig
    ? { ...storeParameter, ...channelConfig }
    : storeParameter;

  const gitBranch =
    sourceCodeParameter?.gitBranch ?? getGitBranchFromStory(currentStory);

  const sourceLinks = currentStory
    ? getSourceLinks(
        {
          importPath: currentStory.importPath,
          type: currentStory.type,
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
    sourceCode?: SourceCodeConfig;
  };
};

export function sourceCodeToolbarAddon(): PreviewAddon<SourceCodeToolbarTypes> {
  return {};
}
