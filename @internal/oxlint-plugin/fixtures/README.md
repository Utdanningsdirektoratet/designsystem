# Test fixtures

Fake workspace packages for `workspace/no-relative-packages`. The rule finds the
`package.json` that owns a file, so its tests need a real directory tree on disk
— but only the manifests: the source files the tests import from are never
created, because the rule works on paths and does not resolve modules.

```
fixtures/            @fixture/workspace-root — stands in for the monorepo root
├── package-a/        @fixture/package-a
├── package-b/        @fixture/package-b
└── unnamed/          a manifest with no `name`
```

None of these are pnpm workspace packages: `pnpm-workspace.yaml` only globs
`@internal/*` and friends, so `pnpm install` never sees them.
