# Density: roadmap and options

Status: prototype on the `feat/density` branch. Code only; nothing in Figma yet.

## Goal

A compact density mode for data-heavy workspaces: less height, padding and spacing in selected components, while font sizes stay unchanged. Density must combine freely with the existing size modes (`data-size="sm|md|lg"`), work the same way in code and Figma, and ideally move upstream to Digdir Designsystemet so it does not remain a Udir-only fork of the component styles.

## Chosen direction: density tokens that alias the size scale

Each density token points at an existing size token, for example `--udsc-density-button-size` → `--ds-size-10` in compact mode. Components opt in by reading the density token with their normal value as the fallback (`--dsc-button-size: var(--udsc-density-button-size, var(--ds-size-12))`).

- **Code:** `src/density.css`. Set `data-density="compact"` on a container; `data-density="default"` switches back for a subtree.
- **Figma:** a "Density" variable collection with the modes `default` and `compact`, where every variable aliases a Semantic `size/N` variable. No maths is needed, which suits Figma variables. Components opt in property by property: in the main component and its variants, the chosen properties (padding, gap, min-height, …) are rebound from a `size/N` variable to a Density variable. Instances inherit the binding, and designers set the Density mode on a frame or instance, like the Size mode.
- **Naming model:** not decided yet; see below.

### Naming models

Both models keep every value an alias, so neither needs maths in Figma, and both need the re-resolving CSS pattern described under Constraints. The decision is pending a discussion with our designer.

**Step scale (`density-size/N`).** One Density variable per step of the size scale. The default mode aliases the same step (`density-size/6` → `size/6`), and the compact mode aliases a smaller step from one mapping table (`density-size/12` → `size/10`). Opting in is a mechanical rebinding from `size/N` to `density-size/N`.

**Role or component tokens (`density/control-height`, `density/button-padding-inline`).** One Density variable per role or component property, with any compact value. The prototype uses one token per component property; a smaller set of role-based tokens (control height, control inline padding, cell padding, container padding, …) gives more consistent bindings.

|                     | Step scale                                                             | Role or component tokens                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rebinding           | Mechanical: `size/N` → `density-size/N`                                | Choose a token for each property                                                                                                                          |
| Normal density      | Unchanged by construction, since each step aliases itself              | Each token's default must equal the current value of every property bound to it, so properties can only share a role token when their normal values match |
| Compact values      | One table for all components; every use of a step shrinks the same way | Free per token                                                                                                                                            |
| Number of variables | Fixed: one per step in use                                             | Grows with roles or components                                                                                                                            |
| Review              | One table shows the whole compact mode                                 | Spread across tokens                                                                                                                                      |

The prototype's hand-picked values fit a single step table except in two places: step 6 becomes 3 for Alert padding but 4 for the Chip icon, and step 5 becomes 4 for the Chip checkbox but 3 for the Tabs inline padding. Its other mappings are consistent (12 → 10, 8 → 6, 4 → 2, 3 → 2, 2 → 1). Choosing the step scale means adjusting those values, or combining the step scale with a few component-specific tokens for the exceptions.

### Figma library today

Found by a read-only inspection of the Komponentbibliotek file with the Figma MCP server on 2026-10-22, at the medium size mode.

- **Structure:** components have no size variants. Their properties are bound to Semantic `size/N` variables, which alias `_size/N` in the Size collection (modes `small`, `medium`, `large`). Font sizes are bound directly to the Size collection's `font-size/N`, and line heights are fixed percentages. A Density collection aliasing `size/N` fits this structure without changing it.
- **Figma has more properties to opt in than `density.css`.** CSS derives some values from others with `calc()`, such as the input's block padding from its height and the Alert's start padding from its end padding, while Figma binds each value separately. Every dependent property in Figma must be rebound too, or the content no longer fits.
- **Some values are fixed numbers.** Opting a component in only requires changing the properties chosen to respond to density, plus any fixed value that stops the compact layout from fitting or shrinking. Those are listed in the table. Other fixed values can stay as they are; binding them is optional cleanup so they follow the Size modes (listed below the table).
- **The fixed values come from Digdir's library.** A snapshot of Digdir's library v1.23.0, compared with Udir's on the same day, has the same fixed values in the same places (Search, Select's chevron, Pagination's "…" items, Chip, Tabs), and the same `size/10` min-height on table cells. Binding them only in Udir's copy would add to its differences from Digdir's library, so they are better proposed upstream.

| Component   | Figma properties to rebind (normal → compact, per the prototype)                                                                    | Needs a decision or a fix first                                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button      | height `size/12` → `size/10`; inline padding `size/4` → `size/2`                                                                    | –                                                                                                                                                                                                                                            |
| Chip        | height `size/8` → `size/6`; checkbox/radio `size/5` → `size/4`; remove icon `size/6` → `size/4`; inline padding `size/3` → `size/2` | Some inline padding sides are `size/2` (radio, checkbox and removable types), which the prototype has no value for                                                                                                                           |
| Textfield   | field height `size/12` → `size/10`                                                                                                  | –                                                                                                                                                                                                                                            |
| Select      | field height `size/12` → `size/10`                                                                                                  | Block padding `size/1` leaves 32px for content in a 40px field, so the inner content (`size/10`) and chevron box (`size/9`) must shrink too; the chevron's fixed block padding of 15 (30 in total) then no longer fits a box of 28px or less |
| Search      | field and button height `size/12` → `size/10`                                                                                       | The search container's fixed block padding of 10 plus the `size/7` icon needs 48px, so the padding must be bound before the field can shrink                                                                                                 |
| Suggestion  | input height `size/12` → `size/10`; option padding `size/3` → `size/2`                                                              | The inspection did not find the count tag that `display="count"` shows in code; Multisuggestion shows selected values as hidden removable Chips                                                                                              |
| Table       | cell padding `size/2` / `size/3` → `size/1` / `size/2`                                                                              | Cells have a Figma-only min-height `size/10`, which would keep compact rows at 40px where code gives 35px                                                                                                                                    |
| Tabs        | tab padding `size/3` / `size/5` → `size/2` / `size/3`                                                                               | –                                                                                                                                                                                                                                            |
| ToggleGroup | item height `size/12` → `size/10`                                                                                                   | –                                                                                                                                                                                                                                            |
| Tag         | height `size/8` → `size/6`; inline padding `size/2` → `size/1`                                                                      | –                                                                                                                                                                                                                                            |
| Pagination  | gap `size/2` → `size/1`; page buttons through Button                                                                                | The "…" items have a fixed height of 48, which would keep the row at 48px while the page buttons shrink                                                                                                                                      |
| Alert       | padding on all sides `size/6` → `size/3`; gap below the heading `size/2` → `size/1`                                                 | –                                                                                                                                                                                                                                            |

Differences between Figma and code that exist regardless of density, and that compact mode would inherit: Button block padding (`size/0` in Figma with a fixed height, size-2 in CSS), Chip inline padding varying by type in Figma, Tag fixed height in Figma versus min-height in CSS, and the Alert icon gap (`size/3` in Figma, size-2 in CSS).

Fixed values that don't block compact density but don't follow the Size modes either (optional cleanup): the Chip radio/checkbox gap (6), the Tabs root gap (1) and the Search container's horizontal gap (9, between the icon and text and the clear button).

Unrelated library issues found on the way, both only in Udir's copy (Digdir v1.23.0 binds the Suggestion gap to `size/2` and has no `sizing/0` binding in Alert): the Suggestion root gap is bound to `spacing/2`, which no longer exists in the Semantic collection; the Alert's zero paddings on the icon and text column are bound to `sizing/0` from a remote library.

For the naming models, the extra Figma properties mean: with the step scale, each is a mechanical rebinding, but the mapping table needs entries for more steps (for example 10 → 8 for the Select's inner content, and a value for 9 for its chevron box); with role or component tokens, each needs a token of its own.

### Constraints

- **Aliases must be re-resolved wherever the size scale changes.** A custom property that contains `var()` is resolved on the element that declares it, and descendants inherit the resolved value. Declaring the aliases only on `[data-density='compact']` therefore gives a nested `data-size="sm"` element md's compact values (40px buttons instead of 35px). `density.css` declares the aliases on `:root, [data-size], [data-density]`, the same places Digdir recalculates `--ds-size-*`, and switches them with a space toggle (`--_udsc-density-compact`). Any generated version of this file must produce the same pattern; a plain `[data-density='compact'] { … }` block reproduces the bug. The density demo story checks this with the pagination, which sets its own `data-size="sm"`.
- **The empty toggle value must survive minification.** `--_udsc-density-compact: ;` is kept by postcss (this package's build) and by lightningcss 1.33.0 (Vite's default minifier).
- **The Digdir CLI (1.23.0) cannot build an extra mode group.** A `Density` group in `$themes.json` does not fail the build: its tokens are written into the `[data-typography]` and `:root` blocks with the default mode's values and invalid expressions such as `floor(4px / 18px * 18px * 12)`, and the compact values are never output. Density token sets must be kept out of the Digdir build input until the CLI supports this.
- **Figma does not have the CSS problem.** Figma documents that a variable bound to a node resolves with the node's own explicit or inherited mode for each collection in the alias chain ([`resolveForConsumer`](https://developers.figma.com/docs/plugins/api/properties/Variable-resolveforconsumer/), including an example with two collections). A Density variable aliasing `size/N` therefore resolves with the Size mode of the layer that uses it, so a nested `sm` instance inside a compact frame gets compact `sm`, provided the variable really is an alias (next point).
- **The Figma import must keep the aliases.** If a Density variable is imported as a fixed number instead of an alias, it keeps the value of one size mode and stops following the Size collection. Digdir's Figma plugin turns any `$themes` group into its own collection (`buildCollectionSpecs`), but only creates aliases for the reference patterns it knows (`mapReferenceToVariableTarget` in `figma/plugin/src/plugin/import/collection-specs.ts`). `{_size.N}` becomes an alias to the Size collection, while `{size.N}` has no mapping, so `buildValueSpec` writes the resolved number. Udir currently syncs variables with Tokens Studio, where cross-collection aliases for these references are also unverified.

## Roadmap

1. **Validate (Udir only).**
   - Keep `density.css` as the code prototype.
   - Choose a naming model with the designer (see Naming models).
   - Build the same tokens as a Density collection in Udir's copy of the Figma library, and rebind the properties listed under "Figma library today", including the fixed values that block the compact layout. Check that the sync creates the Density variables as aliases.
   - Test with designers and users whether compact density is worth it, compared with using `data-size="sm"` for dense areas.
2. **Formalise (Udir only), if it is worth it.**
   - Decide the final token set for the chosen naming model.
   - Move the tokens into `design-tokens/src`, so Tokens Studio syncs them to Figma.
   - Filter the Density group out of the input to `designsystemet tokens build`.
   - Generate `density.css` with Style Dictionary, like `design-tokens/process/build-datavis-css.ts`, using a custom format that writes the re-resolving pattern.
   - Replace the hand-written `--udsc-density-*` variables with the generated ones.
3. **Upstream.**
   - Propose generic support for extra mode groups in the Digdir CLI: output each group as `[data-<group>='<mode>']`, keep references to other tokens, and re-resolve them at `[data-size]` when they reference size tokens. It is non-breaking and not specific to density.
   - Extend Digdir's Figma plugin importer to alias the references density tokens use, for example `{size.N}` to the Semantic `size/N` variable. The alternative is density tokens that reference `{_size.N}`, which the importer already aliases to the Size collection, at the cost of pointing at a private primitive.
   - Propose binding the fixed values that block the compact layout in Digdir's Figma library (see "Figma library today"). They also keep those components from following the Size modes today, so this is useful without density.
   - Then propose density tokens with opted-in components in Digdir's CSS and Figma library. This is additive and does not need a major version.
4. **Separately:** discuss [digdir/designsystemet#4088](https://github.com/digdir/designsystemet/issues/4088) (sizing and spacing units) on its own terms, without making density depend on it.

## Comparison

| Option                                     | Text unchanged | Pick components | Works with nested `data-size` | Figma without maths | Digdir change needed | Breaking           |
| ------------------------------------------ | -------------- | --------------- | ----------------------------- | ------------------- | -------------------- | ------------------ |
| Compact size modes                         | Yes            | No              | No                            | Yes                 | Yes                  | No, but more modes |
| Separate sizing and spacing                | Yes            | No              | Yes                           | Yes                 | Yes, large           | Yes                |
| Proportional density scale                 | Yes            | Yes             | Yes                           | No                  | Yes, or a Udir build | No                 |
| **Density tokens aliasing the size scale** | Yes            | Yes             | Yes, with re-resolving        | Yes                 | No; optional later   | No                 |
| `data-density` changes the size step       | Yes            | No              | Yes                           | No                  | Yes, small           | No                 |
| `data-size="sm"` for dense areas           | No             | No              | Yes                           | Yes                 | No                   | No                 |

## Discarded options

### Compact size modes (`compact-sm`, `compact-md`, `compact-lg`)

Suggested by a Digdir developer: extra size modes with the same font sizes and a smaller size step.

- **The CSS build drops the smaller step.** With hand-added `compact-*` token sets, `designsystemet tokens build` 1.23.0 outputs `[data-size='compact-medium']`, but the only value it writes per mode is `--ds-size-mode-font-size--compact-medium`, which equals `md`. `--ds-size-base` and `--ds-size-step` are written once, so compact modes are identical to the normal ones. The public config also rejects `size.steps`, so `tokens create` cannot generate the modes. Prototyping would require changes in Digdir's repository.
- **Every non-font size shrinks, not only the ones we choose.** 48 declarations in Digdir's component CSS (1.23.0) use the size scale for dimensions rather than spacing, including `--ds-icon-size`, checkbox and radio size, avatar, spinner, badge, arrows and details. At a step giving 40px controls, md icons and checkboxes go from 24px to 20px while the text stays 18px; a 20px checkbox may conflict with WCAG 2.5.8 (24px target size). Consumer layouts that use `--ds-size-*` also tighten.
- **A nested `data-size` leaves compact mode.** `data-size` is the mode switch and also a component variant (`<Pagination data-size="sm">`, `<Heading data-size="md">`, table and spinner sizes). Any such element inside a compact area resets to the normal size scale.
- **Modes multiply.** Three sizes × two densities is six modes in the Size collection; a third density makes nine (Figma Professional allows 10 modes per collection).

Two things that were not obstacles:

- **Border radius would not have been affected.** It is a fixed `rem` value in CSS and lives in the Theme collection in Figma.
- **Types would mostly accept the new values.** `@digdir/designsystemet-types` defines `Size = 'sm' | 'md' | 'lg'`, but React 1.23.0 types `data-size` as `Size | (string & {})` in `DefaultProps` and on HTML elements, so `data-size="compact-md"` type-checks on wrappers and most components. Only components with a narrower union for their own size variant reject it (`Heading`, `Paragraph`, `Spinner`, `Avatar`, `Dropdown.Heading`, `ErrorSummary.Heading`, `Fieldset.Description`).

### Separate sizing and spacing tokens, with density on spacing

Related to [#4088](https://github.com/digdir/designsystemet/issues/4088), which is about whether spacing should scale with the user's preferred font size (`px` versus `rem`), not about density.

- **Control heights would not change.** Digdir sets control heights with sizing tokens (`--dsc-button-size`, `--dsc-input-size`, `--dsc-togglegroup-button-size`, chip and tag heights, dropdown items). About half of the prototype's tokens are heights, and the 48px → 40px controls are its most visible effect.
- **All spacing changes together,** including consumer layout gaps, with no way to choose components.
- **Breaking in code and Figma:** every component binding would have to be sorted into sizing or spacing.

Worth discussing for its own reasons, but not a route to density.

### Proportional density scale (`--ds-density-size-N` with a smaller step)

Easy in CSS, but Figma cannot calculate the values. Every size × density combination would have to be precomputed and either placed in a six-mode collection (coupling size and density again) or chained through a second collection. The only gain over aliasing the existing scale is exact proportional scaling, and stepping down the existing scale (12 → 10) looked fine in the prototype.

### `data-density` changes the size step globally

A small change to Digdir's build: declare `--ds-size-step` on `:root` and `[data-density]` instead of on every `[data-size]`, and recalculate `--ds-size-*` on `[data-density]` too. Tested on a patched build output: compact md controls were 40px, a nested `sm` stayed compact at 35px, and font sizes and radii were unchanged. It fixes the nesting problem of compact size modes, but still shrinks every non-font size, and Figma would need the Size collection to alias into a Density collection with precomputed values for every size and step (about 60 variables per mode).

### `data-size="sm"` for dense areas

Works today in code and Figma, but also reduces the font size, which compact density deliberately avoids. Kept as the baseline when testing whether density adds value.
