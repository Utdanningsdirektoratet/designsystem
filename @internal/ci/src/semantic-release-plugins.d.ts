// The semantic-release plugins ship no type declarations. These cover the
// context fields each plugin reads, so they can be called outside a release.

declare module '@semantic-release/commit-analyzer' {
  import type { Commit, ReleaseType } from 'semantic-release';

  export function analyzeCommits(
    pluginConfig: { preset: string },
    context: {
      commits: readonly Pick<Commit, 'hash' | 'message'>[];
      cwd: string;
      logger: { log(...args: unknown[]): void };
    },
  ): Promise<ReleaseType | null>;
}

declare module '@semantic-release/release-notes-generator' {
  import type { Commit } from 'semantic-release';

  interface Release {
    gitHead?: string;
    gitTag?: string;
    version?: string;
  }

  export function generateNotes(
    pluginConfig: { preset: string; writerOpts?: object },
    context: {
      commits: readonly Pick<Commit, 'hash' | 'message'>[];
      cwd: string;
      lastRelease: Release;
      nextRelease: Release;
      options: { repositoryUrl: string };
    },
  ): Promise<string>;
}
