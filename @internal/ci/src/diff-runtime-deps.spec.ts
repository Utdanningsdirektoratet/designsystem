import { describe, expect, it } from 'vitest';
import {
  type Lockfile,
  type PackageJson,
  buildClosure,
  compareClosure,
  computeSources,
  parseTrackedDepNames,
} from './diff-runtime-deps.js';

describe('parseTrackedDepNames', () => {
  it('always tracks dependencies and peerDependencies, excluding @types/*', () => {
    const pkg: PackageJson = {
      dependencies: { react: 'catalog:', '@types/node': 'catalog:' },
      peerDependencies: { 'react-dom': '^19', '@types/react': '^19' },
      devDependencies: { vite: 'catalog:' },
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['react', 'react-dom']));
  });

  it('tracks only listed devDependencies via trackedDevDependencies', () => {
    const pkg: PackageJson = {
      dependencies: { react: 'catalog:' },
      devDependencies: {
        vite: 'catalog:',
        storybook: 'catalog:',
        vitest: 'catalog:',
        eslint: 'catalog:',
      },
      trackedDevDependencies: ['vite', 'storybook'],
    };
    expect(parseTrackedDepNames(pkg)).toEqual(
      new Set(['react', 'vite', 'storybook']),
    );
  });

  it('ignores trackedDevDependencies entries absent from devDependencies', () => {
    const pkg: PackageJson = {
      devDependencies: { vite: 'catalog:' },
      // `sass` is listed but not actually a devDependency here.
      trackedDevDependencies: ['vite', 'sass'],
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['vite']));
  });

  it('excludes @types/* even when listed in trackedDevDependencies', () => {
    const pkg: PackageJson = {
      devDependencies: { vite: 'catalog:', '@types/node': 'catalog:' },
      trackedDevDependencies: ['vite', '@types/node'],
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['vite']));
  });

  it('tracks all devDependencies except the blocklist via untrackedDevDependencies', () => {
    const pkg: PackageJson = {
      devDependencies: {
        postcss: 'catalog:',
        cssnano: 'catalog:',
        rimraf: 'catalog:',
      },
      untrackedDevDependencies: ['rimraf'],
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['postcss', 'cssnano']));
  });

  it('prefers trackedDevDependencies over untrackedDevDependencies when both are present', () => {
    const pkg: PackageJson = {
      devDependencies: { vite: 'catalog:', vitest: 'catalog:' },
      trackedDevDependencies: ['vite'],
      untrackedDevDependencies: ['vite'],
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['vite']));
  });

  it('does not track any devDependencies when neither field is present', () => {
    const pkg: PackageJson = {
      dependencies: { react: 'catalog:' },
      devDependencies: { vite: 'catalog:', storybook: 'catalog:' },
    };
    expect(parseTrackedDepNames(pkg)).toEqual(new Set(['react']));
  });
});

describe('closure diffing for tracked build tooling', () => {
  const readPkgJson = (name: string): PackageJson | null =>
    name === '@udir-design/react'
      ? {
          name,
          devDependencies: { vite: 'catalog:' },
          trackedDevDependencies: ['vite'],
        }
      : null;

  const makeLockfile = (
    viteVersion: string,
    viteDeps: Record<string, string>,
  ): Lockfile => ({
    importers: {
      '@udir-design/react': {
        devDependencies: {
          vite: { specifier: 'catalog:', version: viteVersion },
        },
      },
    },
    snapshots: {
      [`vite@${viteVersion}`]: { dependencies: viteDeps },
      ...Object.fromEntries(
        Object.entries(viteDeps).map(([n, v]) => [`${n}@${v}`, {}]),
      ),
    },
  });

  it('detects a Vite bump and its transitive bundler churn as added/removed', () => {
    const base = makeLockfile('7.0.0', { esbuild: '0.21.0' });
    const head = makeLockfile('8.1.5', {
      esbuild: '0.28.1',
      rolldown: '1.1.5',
    });
    const seeds = ['@udir-design/react'];

    const report = compareClosure(
      buildClosure(base, seeds, readPkgJson),
      buildClosure(head, seeds, readPkgJson),
      computeSources(base, seeds, readPkgJson),
      computeSources(head, seeds, readPkgJson),
    );

    expect(report.added.map((a) => a.key).sort()).toEqual([
      'esbuild@0.28.1',
      'rolldown@1.1.5',
      'vite@8.1.5',
    ]);
    expect(report.removed.map((r) => r.key).sort()).toEqual([
      'esbuild@0.21.0',
      'vite@7.0.0',
    ]);
    // Every changed snapshot is attributed to the package that pulled it in.
    for (const { sources } of report.added) {
      expect(sources).toEqual(new Set(['@udir-design/react']));
    }
  });

  it('does not detect the same Vite bump when the tool is not tracked', () => {
    const untracked = (name: string): PackageJson | null =>
      name === '@udir-design/react'
        ? { name, devDependencies: { vite: 'catalog:' } }
        : null;
    const base = makeLockfile('7.0.0', { esbuild: '0.21.0' });
    const head = makeLockfile('8.1.5', { esbuild: '0.28.1' });
    const seeds = ['@udir-design/react'];

    const report = compareClosure(
      buildClosure(base, seeds, untracked),
      buildClosure(head, seeds, untracked),
      computeSources(base, seeds, untracked),
      computeSources(head, seeds, untracked),
    );

    expect(report.added).toEqual([]);
    expect(report.removed).toEqual([]);
    expect(report.changed).toEqual([]);
  });
});
