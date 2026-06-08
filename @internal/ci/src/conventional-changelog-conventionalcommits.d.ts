declare module 'conventional-changelog-conventionalcommits' {
  interface CommitType {
    type: string;
    section?: string;
    hidden?: boolean;
  }

  interface PresetConfig {
    types?: CommitType[];
  }

  interface WriterOpts {
    transform: (
      commit: Record<string, unknown>,
      context: unknown,
    ) => Record<string, unknown> | undefined;
    commitPartial: string;
    mainTemplate: string;
    [key: string]: unknown;
  }

  interface Preset {
    writer: WriterOpts;
    [key: string]: unknown;
  }

  export default function createPreset(config?: PresetConfig): Preset;
}
