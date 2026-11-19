# Illustrations

Private Vite React app (`@udir-design/apps-illustrations`) that serves the illustration gallery.

Terms used below:

- A **category** is a section of the gallery (such as `barnehage`), with its own Figma file.
- An **illustration** is one component set in Figma, such as `aktivitet-3a`. The JSON files call it a
  **family**.
- Its **variants** are the combinations of properties (format, colour theme, background and so on).
  Each variant is its own SVG and PNG.

Figma owns the artwork, frame sizes and tags. [source/import-map.json](./source/import-map.json) owns
the IDs, names and properties. [source/figma-snapshot.json](./source/figma-snapshot.json) holds the
frame sizes and tags as `sync:figma` last read them, and which Figma node and illustration each ID
points at. The scripts combine the two into the catalog that the app and the deploy read
(`metadata.json`).

## Adding or changing illustrations

Every change, whether it is new illustrations, new tags or new artwork, follows the same routine.
Each step is safe to run when nothing has changed.

### Before you start

- Put a Figma token with access to the illustration files in the workspace-root `.env.local` as
  `FIGMA_TOKEN=...`. Never commit or log it.
- Run the commands from `apps/illustrations`.

### The routine

1. `pnpm suggest:figma` adds new illustrations and variants from Figma to `source/import-map.json`.
   Existing entries are left alone. If something new does not meet the
   [requirements](#requirements-in-figma), it writes nothing and lists the problems.
2. Review the `import-map.json` diff. Check that only the expected illustrations and variants were
   added, that names and properties read correctly, and that no existing entries changed.
3. `pnpm sync:figma` updates `source/figma-snapshot.json` from Figma (frame sizes and tags) and checks
   that every entry in the import map still matches its Figma node.
4. `pnpm build:assets` downloads missing SVGs and renders the PNGs into `public/illustrations-assets/`.
5. Check the result in the gallery: run `pnpm dev`
   and open `http://localhost:4400/` (see [Running locally](#running-locally)).
6. Commit the changed files in `source/` and open a PR. After merge, the deploy workflow downloads
   the artwork from Figma and publishes it.

To work on one category, which is faster, add it to each step:

```sh
pnpm suggest:figma --category=barnehage
pnpm sync:figma --category=barnehage
ILLUSTRATIONS_CATEGORY=barnehage pnpm build:assets
```

### Changed tags

Edit the component set's description in Figma, then run the routine. `suggest:figma` reports that
nothing was added, and `sync:figma` updates `tags` in `figma-snapshot.json`, which is the only file
to commit. `build:assets` is only needed to see the tags in the local gallery. The deploy uploads the
new metadata and keeps the existing artwork.

### Changed artwork

Neither `build:assets` nor the deploy downloads an SVG that is already there, so a redrawn
illustration needs two extra steps:

1. Run the routine, but run `pnpm fetch:svgs --force --category=<id>` before `pnpm build:assets`. It
   downloads that category's SVGs again.
2. Increase the number in [source/artwork-revision.txt](./source/artwork-revision.txt) by one and
   commit it with the rest. After merge, the deploy starts from an empty folder of raw SVGs and
   downloads every SVG from Figma again, so it takes about 45 minutes longer than usual.

If the frame was resized, `sync:figma` also updates its size in `figma-snapshot.json`. The steps are
the same.

### Rendering the artwork again

The artwork version does not include the svgo and sharp versions, so upgrading them leaves the
deployed SVGs and PNGs as they are. If an upgrade fixes a problem in the deployed files, increase the
number in [source/render-revision.txt](./source/render-revision.txt) by one. The deploy then optimizes
and renders every SVG again and uploads the result. It reuses the raw SVGs stored in the container, so
it only downloads SVGs from Figma that are not stored yet.

### Other changes

| Change                                     | What to do differently                                                                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display name                               | Renaming in Figma has no effect on existing entries. Edit the illustration's `name` in `import-map.json` (keep its `id`). No sync is needed.                                |
| Properties or values                       | Delete the illustration from `import-map.json`, then run the routine. `suggest:figma` adds it again with the same IDs as long as the component set keeps its name and node. |
| Illustration or variant removed from Figma | Run `pnpm suggest:figma --prune` and `pnpm sync:figma --allow-removals`.                                                                                                    |
| Component recreated or copied in Figma     | Same as removed plus new. The new node gets new IDs, so its asset URLs change.                                                                                              |
| New category                               | Add it to `categories` and `sources` in `src/schema.ts` first.                                                                                                              |

### Requirements in Figma

`suggest:figma` only picks up illustrations that follow these rules. Anything it cannot map with
confidence is reported, and nothing is written.

- The component set is on the category's page (`sources` in [src/schema.ts](./src/schema.ts)), at
  most two levels below it (for example page → section → component set). Deeper nodes are not
  fetched; the script warns about them.
- Property names are `Format`, `Color theme`, `Background`, `Geometric shape` and `Character`.
  Properties starting with `_` are ignored.
- Values are `Landscape (16:9)`, `Portrait (4:5)` or `Square (1:1)` for `Format`, `True` or `False`
  for yes/no properties, and `alt 1`, `alt 2` or `alt 3` for `Color theme`.
- Every variant has a unique combination of values.
- Tags go in the component set's description, as comma-separated words such as
  `kontor, retning, piler`. An optional `Tags:` prefix is accepted.
- Instances of the set's components placed elsewhere on the page are exported as variants too. To
  leave out drafts or examples, add their section or node to
  [scripts/exclusions.json](./scripts/exclusions.json) (with a reason).

In the app, the properties appear in Norwegian: `Format`, `Fargetema` (`alt 1/2/3` become `grønn`,
`blå` and `brun`), `Bakgrunn`, `Geometrisk form` and `Karakter`. The translations are in
[scripts/planning.ts](./scripts/planning.ts).

### Troubleshooting

| Message                                                   | Cause and fix                                                                                                                                                               |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FIGMA_TOKEN is missing` or `Figma HTTP 401/403`          | Add or renew the token in the root `.env.local`, and check that it has access to the Figma file.                                                                            |
| `Cannot add new nodes confidently`                        | A new node breaks the [requirements](#requirements-in-figma). Fix it in Figma, or add the entry to `import-map.json` by hand.                                               |
| `has no children in the fetched depth`                    | Something is nested too deep. Move the component set closer to the page.                                                                                                    |
| `Missing family root` or `Export node … is not in family` | A mapped node is gone or moved in Figma. Run `pnpm suggest:figma --prune`, then `pnpm sync:figma --allow-removals`.                                                         |
| `Removing … requires --allow-removals`                    | An entry was removed from `import-map.json`. Rerun with `--allow-removals` if that was intended.                                                                            |
| `Stable … ID … cannot be reassigned`                      | An `id` or `nodeId` was edited in `import-map.json`, or a variant moved to another illustration. Revert it; IDs must keep pointing at the same Figma node and illustration. |
| `The Figma snapshot has no …`                             | `import-map.json` was changed without a sync. Run `pnpm sync:figma`, with `--allow-removals` if entries were removed.                                                       |
| `SVG aspect ratio does not match the mapped frame bounds` | The frame changed size. Run `pnpm sync:figma`, then `pnpm fetch:svgs --force`.                                                                                              |

## Running locally

Start the dev server with `pnpm dev`. The app has
two modes, chosen by whether `VITE_AUTH_CLIENT_ID` is set in `apps/illustrations/.env.local`. Vite reads
that file at startup, so restart `dev` after changing it.

| Mode                              | `VITE_AUTH_CLIENT_ID` | Artwork read from                              | URL                                     |
| --------------------------------- | --------------------- | ---------------------------------------------- | --------------------------------------- |
| Local files (default, no login)   | missing or commented  | `public/illustrations-assets/`                 | `http://localhost:4400/`                |
| Login against the private storage | set                   | The blob container, using your own Entra token | `http://localhost:4400/illustrasjoner/` |

`vite preview` (port 4500) serves the last `build`, in the mode that build was made with.

There are two `.env.local` files, both ignored by git:

| File                               | Contains        | Used by               |
| ---------------------------------- | --------------- | --------------------- |
| `.env.local` in the workspace root | `FIGMA_TOKEN`   | The Figma scripts     |
| `apps/illustrations/.env.local`    | `VITE_*` values | Vite (`dev`, `build`) |

### Local files

1. Put the Figma token in the workspace-root `.env.local`. It is only needed when SVGs are missing.
2. Run `pnpm build:assets` once. It downloads the SVGs and renders the PNGs into
   `public/illustrations-assets/`.
3. Run `dev`, with `VITE_AUTH_CLIENT_ID` missing or commented out in `apps/illustrations/.env.local`
   (or without that file).

### Login against the private storage

1. Copy [.env.example](./.env.example) to `apps/illustrations/.env.local` and fill in all `VITE_*`
   values, including `VITE_AUTH_CLIENT_ID`. They end up in the built JavaScript, so they are not
   secrets. `VITE_ASSET_VERSION` is the name of an uploaded artwork folder in the container,
   `<hash>-r<revision>`. `pnpm exec tsx scripts/version.ts` prints the current `<hash>`, and the
   revision is the number in `source/artwork-revision.txt`.
2. Make sure `http://localhost:4400/illustrasjoner/` is a registered redirect URI (see
   [Hosting and login](#hosting-and-login)) and that your account has the role on the container.
3. Run `dev` and open `http://localhost:4400/illustrasjoner/`.

To go back to local files, comment out `VITE_AUTH_CLIENT_ID` and restart `dev`.

## Scripts

- `fetch:svgs`: downloads the catalog's SVGs that are missing from `source/catalog/svg`.
  Existing files are kept, so an interrupted run resumes. `--force` downloads everything again. It
  needs a Figma token only when something is missing.
- `build:assets`: runs `fetch:svgs`, then validates the SVGs and renders `png/<variant-id>.png` at
  exactly `round(width)` by `round(height)` into `public/illustrations-assets/`. It takes no flags;
  set `ILLUSTRATIONS_CATEGORY=<id>` to build one category.
- `suggest:figma`: adds illustrations and variants on the live Figma page that are missing from
  `import-map.json`. Existing entries are never changed. It warns about entries whose Figma node is
  gone; `--prune` removes them.
- `sync:figma`: refreshes `figma-snapshot.json` from `import-map.json` and the live Figma page (bounds,
  tags, identity checks). `--allow-removals` is required to drop illustrations or variants. It goes
  through the categories one at a time and stops at the first failure. Illustrations follow the
  import map's order, so a sync with no real change gives no diff. It does not download artwork.
- `dev` and `build` do not run `build:assets`, so the monorepo build needs no Figma token. `build` only
  produces the small app shell in `dist/`.
- `typecheck`, `lint`, `test:unit`: normal checks. Tests never access Figma.

## Where things live

| Path                           | In git | Purpose                                                                      |
| ------------------------------ | ------ | ---------------------------------------------------------------------------- |
| `source/import-map.json`       | yes    | Reviewed mapping from Figma nodes to illustrations, variants and properties. |
| `source/figma-snapshot.json`   | yes    | Frame sizes and tags from Figma, and the node and illustration of each ID.   |
| `source/artwork-revision.txt`  | yes    | Raise by one to make the deploy download all artwork again.                  |
| `source/render-revision.txt`   | yes    | Raise by one to make the deploy render and upload all artwork again.         |
| `src/schema.ts`                | yes    | Categories, their Figma files and pages, and the JSON schemas.               |
| `scripts/exclusions.json`      | yes    | Figma sections and nodes that `suggest:figma` skips, with reasons.           |
| `source/catalog/svg/`          | no     | SVGs downloaded from Figma by `fetch:svgs`.                                  |
| `public/illustrations-assets/` | no     | SVGs, PNGs and metadata served by the app, generated by `build:assets`.      |

## Tags

The gallery filters on one option at a time. Typing in the filter field narrows the list, and picking
an option filters the grid. The options are all tags plus the first part of each illustration name
(`aktivitet-3a` is found under "aktivitet"). Options without hits in the current category are marked
"Treff i andre kategorier".

Tags are stored in lowercase, without duplicates, as `tags` in `figma-snapshot.json`, and the preview
dialog shows them. They are not part of `import-map.json`, so editing a tag needs only a new sync and
a commit.

## Hosting and login

The deployed app is a static site at `design.udir.no/illustrasjoner`. Udir staff sign in with Entra ID
(MSAL, single-page app registration, no secret). The artwork is not part of the site: it sits in a
private blob container, and the browser reads it with the user's own token (`storage.azure.com`
`user_impersonation`). Access is controlled by a role assignment for a staff group on the storage
account; see [.azure/README.md](../../.azure/README.md#illustrations-infrastructure).

The app reads the container through Front Door at `design.udir.no/illustrasjoner-filer`
(`VITE_ASSET_BASE_URL`), on the same host as itself. Reading straight from storage was slow on poor
connections: every file needed a CORS preflight, because the token is sent in a header, and Blob
Storage only speaks HTTP/1.1, so the browser ran about six requests at a time. Front Door speaks
HTTP/2 and compresses the files, and same-origin requests need no preflight. It never caches them,
since the requests carry a token. Never upload artwork with `Cache-Control: public`, `s-maxage` or
`must-revalidate`: those would let Front Door cache a file and serve it without a token.

The deploy workflow sets the same variables when it builds the app (the client ID comes from the
repository variable `ILLUSTRATIONS_CLIENT_ID`), so the deployed app has login and the base path
`/illustrasjoner/`. Register `https://design.udir.no/illustrasjoner/` and
`http://localhost:4400/illustrasjoner/` as redirect URIs.

- [.azure/README.md](../../.azure/README.md#illustrations-infrastructure): the storage account, the
  Front Door routes and the role assignments, and how to recreate them.
- [.github/workflows/azure-illustrations-deploy.yml](../../.github/workflows/azure-illustrations-deploy.yml):
  runs on push to `main` and on manual dispatch. A push only deploys when the app (or something it
  depends on) or the workflow changed, which `@internal/ci/bin/should-deploy-illustrations.ts` decides.
  Dispatch always deploys. Its optional `category` input only fetches and uploads that category's
  artwork, as a small test, and leaves the app as it is. Deploys run one at a time.

The deploy uploads artwork to `<hash>-r<revision>/` in the `illustrations` container and the app to
`$web/illustrasjoner`. The hash (`scripts/version.ts`) covers only what shapes the files: each
variant's `id`, `svg`, `nodeId`, `width` and `height`, plus `scripts/svg.ts`, `scripts/build.ts` and
`source/render-revision.txt`. Editing tags, names, properties or grouping keeps the same version, so
only `metadata.json` is uploaded again (on every deploy, overwriting the one in that folder). A
`complete` blob, uploaded last, marks the artwork as fully uploaded. The revision is the number in
`source/artwork-revision.txt`; see [Changed artwork](#changed-artwork). The files are stored
uncompressed, and Front Door compresses them on the way to the browser.

When a version needs rendering, the deploy first downloads the raw SVGs stored under
`source/r<revision>/`, fetches only the missing ones from Figma, and stores those it fetched. A
resized or redrawn variant keeps its file name, so it is only fetched again after a revision raise.

After uploading the app, the deploy writes the version it uses to `live`, then cleans up: a version
that is not live gets a `retired` marker the first time the cleanup sees it, and is deleted once the
marker is more than 7 days old, so open tabs keep working for a week. A version that becomes live
again loses its marker. Raw SVGs for other revisions than the current one are deleted. Deleted
versions cannot be recreated as they were, since Figma only exports the current artwork.
