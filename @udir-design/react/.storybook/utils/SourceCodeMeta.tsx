import { useEffect, useMemo } from 'react';
import { addons } from 'storybook/preview-api';
import type { SourceCodeConfig, SourceCodeLinkConfig } from './sourceCodeUrl';
import { SOURCE_CODE_CHANNEL_EVENT } from './sourceCodeUrl';

type SourceCodeMetaProps = {
  /** When true, configured links replace auto-detected links. */
  overwrite?: boolean;
  links?: SourceCodeLinkConfig[];
};

/**
 * Sends sourceCode parameters to the manager toolbar via the Storybook channel.
 * Use this in standalone MDX docs where `<Meta parameters>` doesn't reach the manager.
 *
 * ```mdx
 * <SourceCodeMeta overwrite links={[{ label: 'Source', path: './src/some/file.mdx' }]} />
 * ```
 */
export function SourceCodeMeta({ overwrite, links }: SourceCodeMetaProps) {
  const config = useMemo<SourceCodeConfig>(
    () => ({ overwrite, links }),
    [overwrite, links],
  );

  useEffect(() => {
    const channel = addons.getChannel();
    channel.emit(SOURCE_CODE_CHANNEL_EVENT, config);
    return () => {
      channel.emit(SOURCE_CODE_CHANNEL_EVENT, null);
    };
  }, [config]);

  return null;
}
