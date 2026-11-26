# Udir's Figma library compared with Digdir v1.23.0: points for review

For the review of Udir's Figma library with the designer. Based on the snapshots `snapshots/digdir/v1.23.0`, `snapshots/digdir/v1.19.0` and `snapshots/udir/2026-10-22`, and the draft rules in `udir-to-digdir.json`. Everything below can be regenerated, in more detail, with the commands in `README.md`; the most useful ones are:

```sh
D=@internal/figma/snapshots/digdir/v1.23.0
D19=@internal/figma/snapshots/digdir/v1.19.0
U=@internal/figma/snapshots/udir/2026-10-22
R=@internal/figma/udir-to-digdir.json
node @internal/figma/compare-snapshots.ts check $U --rules $R
node @internal/figma/compare-snapshots.ts compare $D $U --rules $R --summary \
  --ignore 'variable Theme/' --ignore 'collection Theme' --ignore 'variable Color scheme/'
node @internal/figma/compare-snapshots.ts changes --digdir $D19 $D --udir $U $U --rules $R --summary \
  --ignore 'variable Theme/' --ignore 'collection Theme' --ignore 'variable Color scheme/'
node @internal/figma/compare-snapshots.ts suggest $D $U --rules $R
```

Without `--summary`, `compare` lists every differing fact; add `--ignore` for components that aren't being discussed, or use `--json` and filter by component.

## Background

- Udir's library has the updates from Digdir's change guides up to 1.19.0. Digdir's [1.23.0 release](https://github.com/digdir/designsystemet/issues/5150) says it brings "updates to spacing, corner radius, icon sizes, disabled states, and more", but its only step-by-step guide is for the Select list ([#4436](https://github.com/digdir/designsystemet/issues/4436)). Digdir's [Figma changelog](https://designsystemet.no/no/fundamentals/figma/changelog) lists the changes in each release; it's referred to below where it explains a difference. It also has releases after the v1.23.0 snapshot: 1.24.0 deprecates Search in Figma ([#5578](https://github.com/digdir/designsystemet/issues/5578)), and 1.24.1 changes font sizes and some sizes in the Small and Large size modes.
- Comparing with a snapshot of Digdir's v1.19.0 library shows how much of the gap the 1.23.0 update explains. With the rules applied, Udir and Digdir v1.23.0 differ in 134,552 facts:
  - 2,191 are facts where Udir still has Digdir's v1.19.0 value: Digdir changes since 1.19.0 that Udir hasn't made.
  - 518 are facts Digdir changed since 1.19.0 where Udir has neither the old nor the new value.
  - 131,843 are facts Digdir didn't change since 1.19.0. They are Udir's own changes or older differences, not something the 1.23.0 update explains.
- Udir already has 6,566 of the facts Digdir changed since 1.19.0, 6,493 of them in the Select list: Udir's Select matches Digdir's v1.23.0 Select (586 Select facts still differ).
- Every difference needs one of three outcomes: **a Udir decision** (add a rule, so it stops showing up), **to be changed in Udir's library**, or **a Digdir change to apply**.

## 1. Instances that break the color rules (29)

`check` reports overrides on instances of Button, IconButton and Link that break those components' color rules:

| Component                   | What                                                                                                                                                                | Count |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `.Section` (FormNavigation) | A tertiary `color=neutral` Button with text and icon overridden to `danger` in the `State=Error` variants (8) and to `success` in the `State=Verified` variants (8) | 16    |
| `.Step` (FormNavigation)    | The same: `danger` in `State=Error` (2), `success` in `State=Verified` (2)                                                                                          | 4     |
| `.ReadMoreButton`           | A `color=neutral` Button with text and icon overridden to `info`; Button allows `neutral` and `danger` only (`Button.tsx`)                                          | 4     |
| ReadMore                    | The same Button's icon, overridden to `info` again on the `.ReadMoreButton` instance in `IsOpen=true`                                                               | 1     |
| FileCard                    | An IconButton's icon overridden to `Color/text-default` (follows the Color mode) in `State=Default`, to `danger` in `State=Error`                                   | 2     |
| `.Anchor link`              | A Link's text and arrow overridden to `Color/text-default` (follows the Color mode); Link is neutral in code                                                        | 2     |

To decide: use Button's `color=danger` variant for the error states; allow `success` and `info` (or other colors) on Button, since it allows `neutral` and `danger` only; or change the overrides.

COMMENT:

- `.Section`, `.Step`, `.ReadMoreButton`: these are just internal reuse of the Button, and the overrides are expected. Consumers just see the FormNavigation / ReadMore components.
- FileCard: fixed, icon button color is now default in both cases
- `.Anchor link`: fixed, base component was overriden for some reason (but the actual states were correct). Now all use `Color/neutral/text-default`

## 2. Color rules to confirm

The draft rules restrict these components, based on `@udir-design/theme/build/postprocess-css-colors.ts` (which resets `.ds-breadcrumbs`, `.ds-button`, `.ds-field`, `.ds-input`, `.ds-link`, `.ds-pagination`, `.ds-suggestion` and `.ds-togglegroup` to neutral) and the prop types:

- Button and IconButton: a `color` variant with `neutral` and `danger`.
- Fixed `neutral`: Breadcrumbs, Link, Pagination, ToggleGroup, `.ToggleGroup.Button`, IconToggleGroup, Switch, `.switch base component`, `.Item in suggestion`, `.Item in multiselect`, `.Clearable`.
- Fixed `neutral` with `danger` for errors: `.input checkbox`, `.input radio`.

Not in the rules yet, because Figma and code disagree or the rule type doesn't exist:

- **Dropdown, SkipLink/neutral, `.BaseTekst og understrek`:** fixed to `neutral` in Figma. In code they only omit `data-color`, so they take the color of what they're placed in.
  - COMMENT: Figma is correct, should fix in code
- **Badge:** restricted in code to `neutral`, `success`, `danger`, `info` and `warning` (`Badge.tsx`). A rule for "any of these colors, through the Color mode" doesn't exist yet.
  - COMMENT: Code is correct, but we deliberately chose to not restrict this thorugh a color property in Figma because it will add a lot of "variants"
- **Tabs:** restricted in code to `neutral` and `accent` (`Tabs.tsx`). `_tab elements base` has 3 `accent` bindings of its own: overrides on the pencil icon (`Text container > Pencil › override shape`) in the `Variant=Default` variants `state=default`, `state=Hover` and `state=Active`. The 6 `danger` bindings counted here earlier aren't its own: they are the fill of the `BadgeOLD [Dot=False, color=danger, variant=base]` instance in each variant (`Text container > BadgeOLD`), inherited from that component.
  - COMMENT: Code is correct, we will restrict in Figma. Note: Can't quite find the "danger" and "accent" bindings you claim.

## 3. Components with only some colors converted

Udir binds some layers to fixed colors where Digdir follows the Color mode, but not all. Each needs a decision: convert the rest, or keep them following the mode on purpose.

Bindings are counted in the component where they are set: on its own layers, or as overrides on the instances in it. A binding an instance inherits from its main component is counted in that component only. (An earlier version of this table also counted inherited bindings, which made Details, TableColumn, Popover Trigger, Avatar and `_tab elements base` look larger.)

| Component                          | Following the mode | Fixed                    | Example of a binding following the mode                                                     |
| ---------------------------------- | ------------------ | ------------------------ | ------------------------------------------------------------------------------------------- |
| Search                             | 6                  | 50 `neutral`, 3 `focus`  | The Clear button's icon (`Clear › override icon-left > shape`): `Color/text-subtle`         |
| `.input and label` (Checkbox page) | 2                  | 40 `neutral`, 3 `danger` | `check=checked` and `check=intermediate` with `outline=true`: stroke `Color/border-default` |
| `.Details.Header`                  | 36                 | 8 `neutral`              | Root: fill `Color/surface-default`                                                          |
| Details                            | 2                  | 40 `neutral`             | `border=true`: stroke `Color/border-subtle`                                                 |
| Card                               | 32                 | 32 `neutral`             | Root: fill `Color/surface-default`                                                          |
| Tag                                | 7                  | 2 `neutral`              | Label: fill `Color/text-default`                                                            |
| `.cell and header`                 | 21                 | 2 `neutral`              | Sortable header: fill `Color/surface-active`                                                |
| TableColumn                        | 6                  | 2 `neutral`              | Zebra stripes (`.cell and header › override Zebra`): fill `Color/background-tinted`         |
| `_tab elements base`               | 14                 | 3 `accent`, 2 `neutral`  | `Variant=Card`: stroke `Color/border-subtle`                                                |
| FileUpload (Udir's own)            | 10                 | 67 `neutral`             | Dropzone: fill `Color/surface-default`                                                      |

Inherited bindings, counted in the component they come from:

- **Details:** each of its 4 variants has 10 `.Details.Header` instances, which inherit the header's fill and stroke: 80 bindings following the mode. The 40 fixed bindings in Details are overrides on those instances, setting the title and chevron to `neutral`, while `.Details.Header` itself binds them to `Color/text-default`. Converting `.Details.Header` would fix the 80 and make the 40 overrides unnecessary.
- **TableColumn:** 24 inherited from its `.cell and header` instances.
- **Popover Trigger:** its own 7 bindings are all `neutral`. The 8 following the mode are the fill and stroke of the 4 Popover instances in `State=Focus`, inherited from Popover, which follows the mode throughout.
- **Avatar:** its own 4 bindings all follow the mode; the 2 `danger` are the fill of its `Badge/base/danger/true` instances. Avatar is therefore not partly converted and is left out of the table.
- **`_tab elements base`:** the 6 `danger` are its `BadgeOLD` instances (see section 2).

Search and the checkbox look like omissions: in code, both are neutral.

Layers to change, from going through the bindings:

- **Tag:** the right icon (`InformationSquare #2 › override shape`) is fixed to `Semantic/color/neutral/text-default` in both variants, while the left icon and the label follow the mode (`Color/text-default`), as both icons do in Digdir. Change the right icon to `Color/text-default`.
- **`.cell and header`:**
  - `type=cell`, `Zebra`: fixed to `Semantic/color/neutral/background-tinted`. Should follow the mode: `Color/background-tinted`, as in `table.css` (`--dsc-table-background--zebra`).
  - `type=header row`, `Zebra`: fixed to `Semantic/color/neutral/surface-tinted`. Should keep the zebra stripes unless the row header is tinted, so the same as `type=cell`.
  - `type=header row`, root layer: has a stroke bound to `Color/surface-default`. The row header shouldn't have a border; remove the stroke.

COMMENT:

- We converted to fixed: `.input and label` (Checkbox page), Tabs (with color property for neutral or accent)
- We converted to fixed, but haven't removed the instance overrides: Details, FileUpload
- We converted to mode-following: Table
- We need to fully convert to fixed: Search
- We need to fully convert to mode-following: Card, Tag, Table

We also changed FileUpload's border in Figma to always be border-default and have a "dashed" style more similar to code. We should change code to add hover effect on the whole dropzone, no just the button.

We should also change Table so a row header doesn't disable the zebra stripe for that cell (unless tinted headers is enabled)

## 4. Spacing and sizes

`compare` reports a layer bound to another size variable as a changed fact, for example `boundVariables[paddingLeft]: "Semantic/size/3" → "Semantic/size/4"` (Digdir first, Udir second). 221 layer properties are bound to a different size step in the two libraries. Digdir changed 100 of them after 1.19.0, where Udir still has the v1.19.0 value; 117 were already different from v1.19.0, and in 4 (Select) Udir has neither value:

| Component                                                                                                                  | Difference (Digdir → Udir)                                                                                                                                      | Digdir change since 1.19.0?                    |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Textfield                                                                                                                  | Field padding left and right `size/3` → `size/4`                                                                                                                | Yes: v1.19.0 has `size/4`                      |
| Textfield                                                                                                                  | Gap between label and description `size/0` → `size/1`                                                                                                           | No                                             |
| Search                                                                                                                     | Field padding left `size/3` → `size/4`                                                                                                                          | Yes: v1.19.0 has `size/4`                      |
| Search                                                                                                                     | Label/description gap `size/0` → `size/1`                                                                                                                       | No                                             |
| Icon button                                                                                                                | Icon `size/6` → `size/7`, as in Udir's CSS (`button.css` sets `--ds-icon-size: var(--ds-size-7)` for icon buttons)                                              | Yes: v1.19.0 has `size/7`                      |
| Switch, Radio, Checkbox, Textarea, Suggestion, Multi suggestion, `.input and label`                                        | Label/description gap `size/0` → `size/1`                                                                                                                       | No                                             |
| Select                                                                                                                     | Label/description gap `size/0` → `size/1`                                                                                                                       | New in v1.23.0 (v1.19.0 has `.Select` instead) |
| Suggestion, Multi suggestion                                                                                               | Gap in the input's right content `size/1` and `size/2` → `size/0`                                                                                               | No                                             |
| `.Item in suggestion` (page "❖ Suggestion", frame "Basiskomponenter"), `checked=true` variants, layer `Checkbox and label` | Gap `size/2` → `size/1`, padding left and right `size/3` → `size/2`. The `checked=false` variants have the same values in both (gap `size/0`, padding `size/3`) | No                                             |
| Error summary                                                                                                              | Padding `size/7` → `size/6` (top, bottom) and `size/8` (left, right)                                                                                            | Yes: v1.19.0 has Udir's values                 |
| List                                                                                                                       | Padding left of the list `size/1` → `size/0`                                                                                                                    | Yes: v1.19.0 has `size/0`                      |

The Icon button difference matches Udir's CSS, which keeps the larger icon, so it may be a Udir decision rather than a change to make. The label/description gap of `size/1` is the same in every form component in the table, and outside Select it already differed from v1.19.0.

Udir's `header.css` keeps the spacing before the search icon in the header search "from before Digdir 1.23.0". The snapshots confirm that Digdir also changed the search field's padding after 1.19.0, so the Search padding difference is a Digdir change Udir hasn't made.

Digdir's Figma changelog confirms the rows marked as changes since 1.19.0. Under 1.23.0 it lists: Textfield left padding `size-3` "as in code" ([#5402](https://github.com/digdir/designsystemet/issues/5402)); Search left padding without a search icon `size-3` ([#5197](https://github.com/digdir/designsystemet/issues/5197)); icon size in icon buttons "now matches code" ([#5192](https://github.com/digdir/designsystemet/issues/5192)); ErrorSummary padding `size-7` on all sides ([#5195](https://github.com/digdir/designsystemet/issues/5195)); and a small left padding in List ([#5196](https://github.com/digdir/designsystemet/issues/5196)). For the label/description gap, 1.8.0 lists "Adjusted line height and spacing between label and description" ([#4136](https://github.com/digdir/designsystemet/issues/4136)). The v1.8.0 snapshot already has `size/0` there (Textfield, Checkbox, Radio and Switch), as do v1.14.0, v1.17.0, v1.19.0 and v1.23.0. So Udir's `size/1` is either the value from before that 1.8.0 change, which no snapshot shows, or Udir's own choice.

### The same values in code

Digdir's CSS is `@digdir/designsystemet-css` 1.23.0, the version Udir uses. "Udir's CSS" is what `@udir-design/react/src/components/*/*.css` sets on top of it. Measured values are from Udir's Storybook at the default size, where `size-1` is 4px.

| Figma difference                                                           | Digdir's CSS                                                                                         | Udir's CSS                                                                                                                                  | Rendered in Udir                                                              | Code matches                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Textfield field padding left and right                                     | `--dsc-input-padding-inline: var(--ds-size-3)`                                                       | Set explicitly to the same value in `input/input.css`, next to a fix that keeps the ring of Å from being cut off                            | 12px (`size-3`), measured                                                     | Digdir's Figma (`size/3`)                                                                                     |
| Label/description gap in form components                                   | `.ds-field [data-field=description]` has `margin-block: 0`, so 0                                     | Not overridden                                                                                                                              | 0 in Checkbox, measured; the others from the CSS only                         | Digdir's Figma (`size/0`)                                                                                     |
| Search: space before the magnifying glass                                  | `--dsc-suggestion-search-icon-spacing: var(--ds-size-3)`                                             | Not overridden for Search; `header/header.css` sets `size-2` for the header's search only. Search's icon is `size-7` in `search/search.css` | Not verified: a first measurement didn't find the icon where this CSS puts it | Probably Digdir's Figma (`size/3`), from the CSS only                                                         |
| Icon button icon                                                           | `--ds-icon-size: var(--ds-size-6)`                                                                   | **Overridden:** `.ds-button[data-icon] { --ds-icon-size: var(--ds-size-7) }` in `button/button.css`                                         | 28px (`size-7`), measured                                                     | Udir's Figma (`size/7`)                                                                                       |
| `.Item in suggestion`: gap, and padding left and right                     | `--dsc-suggestion-option-gap: var(--ds-size-2)`, `--dsc-suggestion-option-padding: var(--ds-size-3)` | Not overridden                                                                                                                              | Not measured                                                                  | Digdir's Figma (`size/2`, `size/3`)                                                                           |
| Error summary padding                                                      | `--dsc-errorsummary-padding: var(--ds-size-7)` on all sides                                          | Not overridden (`errorSummary/errorSummary.css` only changes the border radius)                                                             | 28px (`size-7`) on all sides, measured                                        | Digdir's Figma (`size/7`)                                                                                     |
| Suggestion, Multi suggestion: gap between the clear button and the chevron | No single property: the clear button and the chevron are placed separately at the end of the input   | Udir draws the chevron itself in `suggestion/suggestion.css`                                                                                | Not measured                                                                  | Not mapped                                                                                                    |
| List padding left                                                          | `--dsc-list-padding-inline: var(--ds-size-6) 0`, the room for the bullets                            | Not overridden                                                                                                                              | Not measured                                                                  | Not comparable: Figma draws the bullet inside `.listElement`, so `liste`'s padding is a different measurement |

The icon button icon is the only one of these values Udir's code overrides on purpose. Everywhere else Udir's code has Digdir's value, and Udir's Figma is the odd one out. Search's icon size is also overridden, to `size-7` "to before Digdir v1.16.0" in `search/search.css`, but it isn't among the Figma differences above. The Suggestion and List rows need a look in a browser before deciding.

This only covers layers that exist under the same path in both libraries. Where layers, variants or components are named or structured differently (Checkbox, Textfield and Radio have thousands of facts on one side only), spacing can't be compared automatically; those components need to be looked at in Figma, or have their layer names aligned first.

COMMENT:

- We fixed every difference lsited in Figma to match Digdir v1.23, except Icon button kept at size/7

## 5. Bindings to deleted variables

Udir's library has about 740 bindings to 14 variables that are no longer in their collection. The bindings still point to those deleted variables, not to the current variables with the same name, so changes to the current variables won't reach them. Whether they still respond to the size modes, and which values they now have, hasn't been checked in Figma. Eight have the same name as a current variable in the same collection, so they were probably left behind when variables were recreated. The other six have no current variable with that name, and none of them is in Digdir's Semantic collection in any snapshot we have (v1.8.0 to v1.23.0).

The last column shows what Digdir v1.23.0 binds at the same place (same component, variant, layer and property, with the rules applied), counted per binding. "Not in Digdir" means the layer doesn't exist there under the same path: Udir's own components, or layers named or structured differently.

| Deleted variable                           | Bindings | Mostly in                                                            | Current variable with the same name | Digdir v1.23.0 at the same places                                                                                                                                                                                                           |
| ------------------------------------------ | -------- | -------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Theme/font-family`                        | 168      | Button, Header, Textfield, FileUpload, Radio, Card, Search, Checkbox | Yes                                 | `Theme/font-family` 94, not bound 7, not in Digdir 67                                                                                                                                                                                       |
| `Theme/font-weight/medium`                 | 161      | The same                                                             | Yes                                 | **`Theme/font-weight/semibold` 60** (field labels in Textfield, Radio, Checkbox, Search, Textarea, Multi suggestion), `Theme/font-weight/medium` 30 (Button text, Suggestion's label, `.ToggleGroup.Button`), not bound 6, not in Digdir 65 |
| `Semantic/border-width/highlight`          | 156      | Chip, `.input and label`, `.input radio`, `.Item in multiselect`     | **No**                              | Not bound 64 (a fixed stroke weight of 2), not in Digdir 92                                                                                                                                                                                 |
| `Size/font-size/4`                         | 126      | Button, Textfield, FileUpload, Radio, Search, Checkbox               | Yes                                 | `Size/font-size/4` 88, not bound 7, not in Digdir 31                                                                                                                                                                                        |
| `Semantic/spacing/5`                       | 60       | `.Details.Header`                                                    | **No**                              | `Semantic/size/5` 40 (`_Accordion.Content`), not in Digdir 20 (Udir's `Accordion content` layer)                                                                                                                                            |
| `Size/font-size/5`                         | 22       | Header                                                               | Yes                                 | Not in Digdir 22                                                                                                                                                                                                                            |
| `Size/font-size/7`                         | 14       | Card, `_LinkCard title`, DemoBanner                                  | Yes                                 | Not in Digdir 14                                                                                                                                                                                                                            |
| `Semantic/spacing/2`                       | 13       | Multisuggestion, Suggestion, `.table-avatar`, `.Slot component`      | **No**                              | `Semantic/size/2` 12, not in Digdir 1 (`.table-avatar > Frame 2118`)                                                                                                                                                                        |
| `Theme/font-weight/semibold`               | 5        | `.cell and header`                                                   | Yes                                 | `Theme/font-weight/semibold` 4, not in Digdir 1                                                                                                                                                                                             |
| `Semantic/spacing/3`, `/4`, `/6`           | 6        | `.Slot component`, ButtonGroup                                       | **No**                              | `/3`: `Semantic/size/3` 3; `/6`: `Semantic/size/6` 2; `/4`: not in Digdir 1 (ButtonGroup, which Digdir doesn't have)                                                                                                                        |
| `Semantic/color/accent/background-default` | 2        | `.fargeklatt`                                                        | Yes                                 | Not in Digdir 2                                                                                                                                                                                                                             |
| `Theme/font-weight/regular`                | 1        | Textfield                                                            | Yes                                 | Not bound 1                                                                                                                                                                                                                                 |

Likely replacements:

- **`Semantic/spacing/N` → `Semantic/size/N`.** Where Digdir has the layer, it binds `size/N` with the same number, and the layers bound to `spacing/N` now have the same pixel values as `size/N` at the default size (`spacing/2` 8px, `/3` 12px, `/4` 16px, `/5` 20px, `/6` 24px). ButtonGroup's 16px gap (`spacing/4`) would be `size/4`, but Digdir removed ButtonGroup in 1.17.0 because it isn't a component in code ([#5024](https://github.com/digdir/designsystemet/issues/5024)), and ChipGroup with it ([#5025](https://github.com/digdir/designsystemet/issues/5025)). Udir still has both.
- **`Semantic/border-width/highlight` → a fixed stroke weight of 2.** Digdir's changelog for 1.6.0 lists "Checkbox: Removed the ghost variable `border-width/highlight`" ([#4031](https://github.com/digdir/designsystemet/issues/4031)), so Udir's bindings are from before that fix. Neither library has a 2px border-width variable (`border-width/default` is 1, `border-width/focus` is 3), and Digdir leaves the 2px strokes unbound. In code, checkbox and radio borders are `--dsc-input-border-width--toggle: max(var(--ds-border-width-default), .5 * var(--ds-size-1))`, 2px at the default size.
- **Variables with a namesake → the namesake**, with one exception: in field labels, Digdir binds `Theme/font-weight/semibold` where Udir has the deleted `medium`. This is the 1.23.0 change "Form components: Labels are now semibold and descriptions use `text-default`, to make them easier to tell apart" ([#3913](https://github.com/digdir/designsystemet/issues/3913)). The code agrees with Digdir: `.ds-label` has `font-weight: var(--ds-font-weight-semibold)` and buttons `var(--ds-font-weight-medium)`, and Udir overrides neither. The same change moved descriptions from `neutral/text-subtle` to `neutral/text-default` in Digdir's Textfield, Checkbox, Radio and Multi suggestion (not in Suggestion and Switch, which still have `text-subtle` in v1.23.0). Udir's descriptions are all still `neutral/text-subtle`. In code, descriptions inherit the text color (`--dsc-field-description-color: inherit`), and Udir doesn't override it.

Digdir v1.23.0 has one binding to a deleted variable: the icon in Link's `state=visited` is bound to `Color scheme/global/purple/12`. Digdir's 1.24.0 changelog fixes this icon to use `text/subtle` ([#4969](https://github.com/digdir/designsystemet/issues/4969)); it names the old binding `link/color/visited`, so the two may not be the same binding.

Decided: the replacements above, with `semibold` for field labels, the highlight border width unbound at 2px, and ButtonGroup and ChipGroup rebound like the rest (whether to delete them is a separate decision). The fix plugin in `@internal/figma/fix-plugin/` makes these changes; see `README.md`. Deleted variables it has no replacement for are listed in its report and left alone.

## 6. Variables

Counted on the 2026-11-26 snapshot.

- **Code syntax:** 161 of Udir's variables have no code syntax or a different one from Digdir's. Decided: set them to Udir's CSS variable names, which the fix plugin does.
  - Semantic colors (128): `accent`, `neutral`, `info`, `success`, `warning` and `danger` (96) have code syntax without the color name, such as `var(--ds-color-base-default)` where Udir's CSS has `--ds-color-accent-base-default`; `support1` and `support2` (32) have none.
  - No code syntax: the Color collection (16), the font sizes in Size (10), `border-width/default` and `/focus` and `opacity/disabled` in Semantic (3), and `font-family` and `font-weight/medium`, `/regular` and `/semibold` in Theme (4).
  - The plan only uses names that exist in Udir's built theme CSS (`@udir-design/theme/dist/index.css`). Variables that have no code syntax in Digdir either, such as the `Color scheme` steps and `Size/_size/*`, are left as they are.
- **Scopes:** 246 variables have different scopes from Digdir's. Decided: use Digdir's scopes for all of them, including hiding the primitives; the fix plugin does this.
  - Font sizes `Size/font-size/1`–`10`: `ALL_SCOPES` in Udir, `FONT_SIZE` in Digdir, so Figma offers them for every property.
  - `Theme/font-family`: `ALL_SCOPES` in Udir, `FONT_FAMILY` in Digdir.
  - The other 235 are primitives that Digdir hides from the variable pickers with empty scopes, while Udir has `ALL_SCOPES` (or `FONT_STYLE` for the Typography font weights): `Color scheme/udir/*` (131), `Theme/color/*` (99), `Typography/udir/*` (4) and `Size/_size/unit`. Hidden, they can't be picked directly, so designers bind the Semantic and Color variables that follow the size and color modes instead. Udir's components bind a primitive directly in one place (a `Typography/udir/font-weight` variable), so hiding them should change little for existing components. Scopes control where a variable is offered in the UI; whether hiding a variable affects layers already bound to it hasn't been checked in Figma.

## 7. Components rebuilt with slots

Card is marked as rebuilt in the rules: its differences (5,284 facts) are only counted. `.Details.Header`, Dialog and `.cell and header` also use slots, which Digdir's library doesn't. Should they be marked as rebuilt too? Their differences would then also only be counted, but instances of color-restricted components in them are still checked.

COMMENT: Yes, mark them as rebuilt.

## 8. Names and variants to confirm

In the rules:

- Component renames: AvatarStack, ErrorSummary, IconButton, IconToggleGroup, Multisuggestion, Popover Trigger, SkipLink/neutral (Digdir: Avatar stack, Error summary, Icon button, Icon toggle group, Multi suggestion, Popover.Trigger, Skip link).
- Heading and Paragraph sizes `large` → `lg` and so on; `.ToggleGroup.Button` property `variant` → `type`.
- Variable and mode names `udir` → `starter-theme`, `support1` → `brand1`, `support2` → `brand2`.

Not in the rules yet:

- `.Scalable checkmark` in Udir and `.Scalable checkmark/medium` in Digdir: the same component?
  - COMMENT: Same component
- `.input radio`: Udir's `state` and Digdir's `type`, with `default` and `Default`.
  - COMMENT: Keep Udir's, they make more sense
- `_tab elements base`: Udir's `Hover`/`Active` and Digdir's `hover`/`active`; Udir also has a `Variant` property (`Card`, `Default`).
  - COMMENT: casing change is inconsequential; Udir has an added tab variant
- Avatar and Avatar stack: Digdir has a `square` property, Udir doesn't.
  - COMMENT: deliberately removed in Udir
- Paragraph: Digdir has `weight=medium` variants, Udir doesn't.
  - COMMENT: deliberately removed in Udir

## 9. Largest remaining differences

With the rules applied, about 134,600 facts remain (variables in the Theme and Color scheme collections left out). The largest, apart from Udir's own components (Header, the logos, Footer, FileUpload, FileCard, TableOfContents, FormSummary, FormNavigation):

| Component                  | Only in Digdir | Only in Udir | Changed | Likely cause                                             |
| -------------------------- | -------------- | ------------ | ------- | -------------------------------------------------------- |
| Avatar stack               | 6,981          | 3,670        | 0       | No `square` property in Udir                             |
| Checkbox                   | 2,797          | 2,793        | 162     | Same variants, layers named or structured differently    |
| Multi suggestion           | 2,647          | 2,590        | 152     | The same                                                 |
| `.Aspect Ratio Spacer`     | 4,360          | 0            | 741     | Digdir binds the zero paddings to `size/0`, Udir doesn't |
| Textfield                  | 1,795          | 1,846        | 609     | Layers differ; spacing in section 4                      |
| Radio                      | 1,088          | 1,047        | 525     | The same                                                 |
| Search                     | 1,886          | 10           | 226     | Digdir has `state=disabled` variants, Udir doesn't       |
| `_tab elements base`, Tabs | 1,089          | 2,147        | 4       | Udir's Card tab variant                                  |
| Chip                       | 864            | 710          | 115     | To look at                                               |
| Breadcrumbs                | 593            | 993          | 64      | Layers differ (for example no ChevronRight layers)       |

## Related

On the `feat/density` branch, `@udir-design/css/DENSITY.md` lists the Figma properties a compact density mode would rebind, and the naming model to choose for density tokens.
