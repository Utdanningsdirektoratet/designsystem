# Figma library snapshots

Udir's Figma component library is a copy of [Digdir's Figma library](https://www.figma.com/community/file/1322138390374166141/designsystemet-core-ui-kit) with our own changes and components. It does not receive Digdir's updates automatically: we apply them by hand, following Digdir's change guides ([Figma Community changelog](https://github.com/digdir/designsystemet/wiki/Figma-Community-Changelog)). As of October 2026, the last guide applied is the one for 1.19.0. Udir has its own FileUpload component and does not use Digdir's.

The change guides don't cover everything a release changes. Digdir's 1.23.0 release, for example, describes "updates to spacing, corner radius, icon sizes, disabled states, and more", but its only step-by-step guide is for the Select list. The scripts here make structured snapshots of both libraries, so that updates can be checked instead of trusted:

- `extract-snapshot.js` reads variables and components inside Figma and returns them as JSON with a checksum. It never changes the file.
- `plugin/` is a development plugin that runs the extractor on every page of the open file and saves the result as one `snapshot.json`.
- `compare-snapshots.ts` verifies saved snapshots and compares them, optionally with the rules in `udir-to-digdir.json` (see [Rules](#rules)).
- `notes/` has notes for reviews of the comparisons.

## Figma files

- Udir's library: [Komponentbibliotek](https://www.figma.com/design/6cS3POn7y9Zost26ofJh0a/Komponentbibliotek)
- Digdir's library at v1.23.0: [[v1.23.0] Designsystemet - Core UI Kit](https://www.figma.com/design/ktnz2KCAra39ZO2a1OShrw/-v1.23.0--Designsystemet---Core-UI-Kit), a copy of Digdir's community file in the Figma folder "Digdirs bibliotek, versjonert". Each Digdir release to compare with gets its own copy there, named after the release.

## Approach

We have no copy of Digdir's library from when Udir's was made, so differences that exist today can't be explained after the fact. Instead:

1. **Now:** snapshot Digdir's current library and Udir's library. The differences between them are recorded as existing and unsorted, to be sorted later with the help of the designer, the "before Digdir vX" comments in our component CSS, and Digdir's earlier change guides.
2. **At each later Digdir update:** snapshot Digdir's library again, and snapshot Udir's again after applying the change guide. Each library is compared with its own previous snapshot:
   - Digdir before → after is what Digdir changed, which the change guide should describe.
   - Udir before → after is what we changed.
   - Comparing the two shows changes we missed or applied differently, and changes only Udir made.

The first update after the initial snapshots is an exception if Digdir's snapshot is already of the release being applied (for example a Digdir 1.23.0 snapshot taken before Udir applies the 1.23.0 guide). There is then no Digdir "before" snapshot; compare `diff` of Digdir with Udir before and after applying the guide instead. Differences that disappear were resolved by the update.

## Making a snapshot

Save each snapshot in its own directory: `@internal/figma/snapshots/digdir/<release>/` for Digdir, since each copy of Digdir's library is a release (for example `@internal/figma/snapshots/digdir/v1.23.0/`), and `@internal/figma/snapshots/udir/<YYYY-MM-DD>/` for Udir. Commit the snapshots, so the next comparison has them.

Digdir's library has to be copied into one of Udir's Figma teams first: open the community file and duplicate it.

Every snapshot records the schema version of the extractor that made it (`SNAPSHOT_SCHEMA` in `extract-snapshot.js` and `snapshots.ts`). Bump it whenever a change to the extractor changes what is recorded; `compare-snapshots.ts` then refuses older snapshots, since comparing snapshots from different extractor versions would report differences that are not in the libraries. Snapshots that will be compared with each other must be extracted again after such a change.

To make a snapshot:

1. Build the plugin: `pnpm turbo @internal/figma#build`. This writes `@internal/figma/plugin/dist/code.js`, the extractor and `plugin/main.js` combined.
2. In the Figma desktop app, choose Plugins → Development → Import plugin from manifest, and select `@internal/figma/plugin/manifest.json`. This is only needed once, and only you see the plugin.
3. Open the library, run Plugins → Development → Udir library snapshot, and press **Extract snapshot**. The plugin opens each page in turn to load it, and returns to the page you started on.
4. Press **Download snapshot.json**, or **Copy JSON** and paste it into a file, and save it as `snapshot.json` in the snapshot directory. Pages the plugin couldn't extract are listed in the plugin, and are recorded in the file so that `verify` fails.
5. Run `node @internal/figma/compare-snapshots.ts verify <snapshot-dir>`.

A Figma MCP server can't replace the plugin: its `use_figma` tool is only available to MCP clients Figma has approved, and rejects results over 48,000 bytes, which many single component sets exceed.

## Comparing snapshots

```sh
# Check that every saved file matches its checksum
node @internal/figma/compare-snapshots.ts verify @internal/figma/snapshots/udir/2026-10-22

# Differences between two snapshots, for example Udir compared with Digdir today
node @internal/figma/compare-snapshots.ts diff @internal/figma/snapshots/udir/2026-10-22 @internal/figma/snapshots/digdir/v1.23.0

# After a Digdir update: what Digdir changed compared with what Udir changed
node @internal/figma/compare-snapshots.ts changes \
  --digdir @internal/figma/snapshots/digdir/<before> @internal/figma/snapshots/digdir/<after> \
  --udir @internal/figma/snapshots/udir/<before> @internal/figma/snapshots/udir/<after>
```

Both comparing commands print a Markdown report with every differing fact. `--summary` prints one table row per component or variable collection instead, with counts and the variants that exist in only one snapshot; use it first, since a comparison of the two libraries has well over 100,000 differing facts. Component rows count facts (one per recorded property of a layer), variable rows count variables; the `Counted` column says which. `--json` prints the raw result. `--ignore <prefix>` leaves out facts whose key starts with the prefix, and can be repeated. Keys start with `collection <name>`, `variable <collection>/<name>` or `component <name>`, for example `--ignore 'variable Theme/' --ignore 'component FileUpload'`.

## Rules

Udir differs from Digdir on purpose in many places: components and variant values are named differently, and many components are restricted to fewer colors (Digdir allows every color on every component). `udir-to-digdir.json` describes these decisions, so a comparison can tell them apart from accidental omissions.

```sh
# Udir's library checked against its color rules
node @internal/figma/compare-snapshots.ts check @internal/figma/snapshots/udir/2026-10-22 --rules @internal/figma/udir-to-digdir.json

# Udir compared with Digdir, with the rules applied
node @internal/figma/compare-snapshots.ts compare @internal/figma/snapshots/digdir/v1.23.0 @internal/figma/snapshots/udir/2026-10-22 \
  --rules @internal/figma/udir-to-digdir.json --summary

# Candidates for rules the file doesn't have yet
node @internal/figma/compare-snapshots.ts suggest @internal/figma/snapshots/digdir/v1.23.0 @internal/figma/snapshots/udir/2026-10-22 \
  --rules @internal/figma/udir-to-digdir.json
```

`changes` also takes `--rules`, so that a Digdir change to `Icon button` lines up with the same change to Udir's `IconButton`. Rules are never applied when a library is compared with its own earlier snapshot (`diff`).

The sections of the rules file:

- `components`: Udir component name → Digdir component name.
- `variantProperties`: Digdir component name → { Udir variant property → Digdir variant property }.
- `variantValues`: Digdir component name → Digdir variant property → { Udir value → Digdir value }, such as `large` → `lg`.
- `variableNames`: Udir → Digdir names for parts of variable names and for mode names, such as the theme name (`udir` → `starter-theme`) and color names (`support1` → `brand1`).
- `colors`: Udir component name → the colors it may use, with a `reason` giving the evidence. Either `fixed` (every color binding uses that color) or `variantProperty` with `values` (each variant uses the color its value of that property names, such as Button's `color=danger`). `alsoAllowed` lists further fixed colors allowed anywhere in the component, such as `danger` for error states.
- `restructured`: Udir component name → why Udir rebuilt it, for example with Figma slots. Its differences are counted per component instead of listed.
- `notes`: free text.

Color rules are used twice:

1. **`check`, and the first section of `compare` and `changes`,** checks Udir's library as it is. In a component with a color rule, every binding that follows the Color mode (`Color/…`), every binding to a color the rule doesn't allow, an explicit Color mode the rule doesn't allow, and a variant value the rule doesn't list are reported. This catches a layer left unconverted even where Digdir has the same binding. Instances of a component with a rule are checked in every component they're used in, including components without a rule and rebuilt ones: their overrides and their own explicit Color mode must follow the rule of the component they're an instance of. That includes instances nested in other instances: an override on a nested instance, or on a layer inside nested instances (the snapshot records the instances a layer sits in as `ownerComponents`, nearest first), follows the rule of the nearest of those components that has one, and otherwise the rule of the instance or component the override is made in. An override binding a neutral Button's text to `danger`, for example, is reported; the component should use Button's `color=danger` variant instead, or the rule should allow it.
2. **Then the comparison:** in the same components, Digdir's bindings that follow the Color mode are bound to the rule's color instead (`Color/base-default` → `Semantic/color/neutral/base-default`), and a component with a color variant property gets one copy of each Digdir variant per color. What remains in the comparison is what no rule explains.

The rules file names components and properties as they are in the snapshots; `compare`, `check` and `suggest` stop with a list if a name doesn't exist, since that rule would do nothing.

`suggest` proposes rules from the snapshots: components and variant values whose names differ only in case, spacing or size synonyms, components where Digdir follows the Color mode and Udir binds fixed colors only, components using slots, and, for a decision by hand, components where only some bindings were converted to fixed colors. Check each suggestion before adding it: the colors a component may use are a design decision, and the code (prop types narrowing `data-color`, and `@udir-design/theme/build/postprocess-css-colors.ts`, which resets some components to neutral) is the evidence to give in `reason`.

## What a snapshot records

- **Variables:** per collection, the mode names and the default mode; per variable, its type, scopes, code syntax and value in each mode. Aliases are recorded as `Collection/variable`, colors as hex.
- **Components:** component property definitions, and for every variant the layer tree with the order of each layer's children, auto layout, padding, gaps, min and max sizes, corner radii, strokes, fills, effects, styles, text properties, the variable bound to each property, and the variable modes set explicitly on each layer (`variableModes`, for example `{ "Color": "accent" }`).
- **Instances inside components** are not expanded. They record their main component, component property values and overrides, so changes to the main component are reported once, where it is defined. For each overridden layer, the snapshot keeps the overridden values, all of the layer's variable bindings, the instances it sits in, and for a nested instance also its main component and property values. Overrides whose layer can't be looked up are counted in `unreadableOverrides`.

Things to keep in mind when reading a comparison:

- Libraries are matched by names, since node and variable ids differ between files. A renamed layer, component or variable shows up as removed and added. Layers with the same name under the same parent are numbered in order (`Text`, `Text #2`), so reordering them also shows up as changes to their facts, not only to the parent's `children`.
- A component name used on several pages gets the page added (`Card (page Patterns)`). A name used more than once on one page gets the frames it sits in added (`_Header (in Card internals)`). If even that doesn't tell them apart, they're numbered in document order and the comparison prints a warning to check them by hand. How a snapshot is split into files doesn't affect any of this, but a same-named component appearing elsewhere changes the keys of the existing one, which then shows up as removed and added.
- An instance's `mainComponentContainer` (the frames around its main component) is only compared when the main component's name is ambiguous, so an instance switching between two `_Header`s is reported without every instance changing when frames are renamed.
- Width and height are only recorded when they are fixed; hug and fill sizes depend on content.
- Variables from another library are marked `(remote)`. Local variables that have been deleted from their collection are marked `(deleted)`: Figma still finds them by id and keeps bindings to them working, so without the mark they would look like ordinary bindings. Deleted variables in another library can't be detected this way. Bindings to variables that can't be found at all are recorded as `<missing>`.
- Udir's theme values (colors, the Theme collection's mode names) differ from Digdir's on purpose; use `--ignore` for those when comparing the two libraries with each other. For a fill or stroke bound to a color variable, only the variable is compared, not the color it resolves to in the file's theme. Which color that is depends on the Color mode, so read bindings to the Color collection together with `variableModes`.
- Only modes set explicitly on a layer are recorded. Modes a main component inherits from the frames it sits in on the library page are left out, since instances don't take them along, and so are Figma's team-default modes. A component without an explicit Color mode uses whatever mode the place it's used in has.
- Page names are compared without leading and trailing spaces, since the libraries differ there (`❖  Checkbox ` and `❖  Checkbox`).

## Tests

`pnpm turbo @internal/figma#test:unit` runs the built plugin against a minimal stand-in for the Plugin API, and checks the results with `compare-snapshots.ts` (`snapshot-scripts.test.ts`). `rules.test.ts` checks the rules on small hand-built snapshots. The package's `lint`, `typecheck` and `test:unit` tasks run with the rest of the workspace.
