import {
  ComponentIcon,
  DocumentIcon,
  GithubIcon,
  JumpToIcon,
  StorybookIcon,
} from '@storybook/icons';
import React from 'react';
import { ActionList, Button, WithTooltip } from 'storybook/internal/components';
import type { PreviewAddon } from 'storybook/internal/csf';
import type { API_LeafEntry } from 'storybook/internal/types';
import {
  addons,
  types,
  useParameter,
  useStorybookApi,
  useStorybookState,
} from 'storybook/manager-api';
import type { SourceCodeConfig } from '../utils/sourceCodeUrl';
import { getSourceLinks } from '../utils/sourceCodeUrl';

const ADDON_ID = 'udir/source-code-toolbar';
const TOOL_ID = `${ADDON_ID}/tool`;

const getLinkIcon = (label: string) => {
  const s = label.toLowerCase();

  if (s.includes('component')) return <ComponentIcon aria-hidden />;
  if (s.includes('stories')) return <StorybookIcon aria-hidden />;
  if (s.includes('documentation')) return <DocumentIcon aria-hidden />;
  if (s.includes('file')) return <DocumentIcon aria-hidden />;

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

  const sourceCodeParameter = useParameter<SourceCodeConfig | undefined>(
    'sourceCode',
  );

  const gitBranch = api.getGlobals()['gitBranch'];
  const parent = currentStory?.parent
    ? api.resolveStory(currentStory.parent)
    : undefined;
  const siblings =
    currentStory?.type === 'docs' &&
    parent &&
    parent.type !== 'docs' &&
    parent.type !== 'story'
      ? parent.children
          .filter((x) => x !== storyId)
          .map((x) => api.resolveStory(x))
          .filter((x) => x !== undefined)
      : undefined;

  const sourceLinks = currentStory
    ? getSourceLinks(
        {
          story: currentStory,
          siblings,
          sourceCode: sourceCodeParameter,
        },
        gitBranch,
      )
    : [];

  const hasLinks = sourceLinks.length > 0;

  const overlay = hasLinks ? (
    <ActionList>
      {sourceLinks.map((link) => (
        <ActionList.Item key={link.href}>
          <ActionList.Link
            href={link.href}
            target="_blank"
            rel="noopener,noreferrer"
            ariaLabel={false}
            style={{ justifyContent: 'start' }}
          >
            {getLinkIcon(link.label)} {link.label}
          </ActionList.Link>
        </ActionList.Item>
      ))}
    </ActionList>
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
      <Button
        title="See source code"
        key={TOOL_ID}
        disabled={!hasLinks}
        ariaLabel={false}
      >
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
