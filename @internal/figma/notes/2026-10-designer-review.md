# Udir's Figma library compared with Digdir v1.23.0: points for review

For the review of Udir's Figma library with the designer. Based on the snapshots `snapshots/digdir/v1.23.0` and `snapshots/udir/2026-10-22`, and the draft rules in `udir-to-digdir.json`. Everything below can be regenerated, in more detail, with the commands in `README.md`; the most useful ones are:

```sh
D=@internal/figma/snapshots/digdir/v1.23.0
U=@internal/figma/snapshots/udir/2026-10-22
R=@internal/figma/udir-to-digdir.json
node @internal/figma/compare-snapshots.ts check $U --rules $R
node @internal/figma/compare-snapshots.ts compare $D $U --rules $R --summary \
  --ignore 'variable Theme/' --ignore 'collection Theme' --ignore 'variable Color scheme/'
node @internal/figma/compare-snapshots.ts suggest $D $U --rules $R
```

Without `--summary`, `compare` lists every differing fact; add `--ignore` for components that aren't being discussed, or use `--json` and filter by component.

## Background

- Udir's library has the updates from Digdir's change guides up to 1.19.0. Digdir's [1.23.0 release](https://github.com/digdir/designsystemet/issues/5150) says it brings "updates to spacing, corner radius, icon sizes, disabled states, and more", but its only step-by-step guide is for the Select list ([#4436](https://github.com/digdir/designsystemet/issues/4436)). Many differences below may therefore be Digdir changes since 1.19.0 that no guide describes, not Udir decisions.
- Every difference needs one of three outcomes: **a Udir decision** (add a rule, so it stops showing up), **to be changed in Udir's library**, or **a Digdir change to apply**.

## 1. Instances that break the color rules (28)

`check` reports overrides on instances of Button, IconButton and Link that break those components' color rules:

| Component                   | What                                                                                                                              | Count |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `.Section` (FormNavigation) | A tertiary `color=neutral` Button with text and icon overridden to `danger`, in the `State=Error` variants                        | 16    |
| `.Step` (FormNavigation)    | The same, in `State=Error`                                                                                                        | 4     |
| `.ReadMoreButton`           | A `color=neutral` Button with text and icon overridden to `info`; Button allows `neutral` and `danger` only (`Button.tsx`)        | 4     |
| FileCard                    | An IconButton's icon overridden to `Color/text-default` (follows the Color mode) in `State=Default`, to `danger` in `State=Error` | 2     |
| `.Anchor link`              | A Link's text and arrow overridden to `Color/text-default` (follows the Color mode); Link is neutral in code                      | 2     |

To decide: use Button's `color=danger` variant for the error states, allow `info` (or another color) on Button, or change the overrides.

## 2. Color rules to confirm

The draft rules restrict these components, based on `@udir-design/theme/build/postprocess-css-colors.ts` (which resets `.ds-breadcrumbs`, `.ds-button`, `.ds-field`, `.ds-input`, `.ds-link`, `.ds-pagination`, `.ds-suggestion` and `.ds-togglegroup` to neutral) and the prop types:

- Button and IconButton: a `color` variant with `neutral` and `danger`.
- Fixed `neutral`: Breadcrumbs, Link, Pagination, ToggleGroup, `.ToggleGroup.Button`, IconToggleGroup, Switch, `.switch base component`, `.Item in suggestion`, `.Item in multiselect`, `.Clearable`.
- Fixed `neutral` with `danger` for errors: `.input checkbox`, `.input radio`.

Not in the rules yet, because Figma and code disagree or the rule type doesn't exist:

- **Dropdown, SkipLink/neutral, `.BaseTekst og understrek`:** fixed to `neutral` in Figma. In code they only omit `data-color`, so they take the color of what they're placed in.
- **Badge:** restricted in code to `neutral`, `success`, `danger`, `info` and `warning` (`Badge.tsx`). A rule for "any of these colors, through the Color mode" doesn't exist yet.
- **Tabs:** restricted in code to `neutral` and `accent` (`Tabs.tsx`), but `_tab elements base` binds `danger` (6) and `accent` (3) directly, alongside bindings that follow the Color mode.

## 3. Components with only some colors converted

Udir binds some layers to fixed colors where Digdir follows the Color mode, but not all. Each needs a decision: convert the rest, or keep them following the mode on purpose.

| Component                          | Following the mode | Fixed                               | Example of a binding following the mode                                             |
| ---------------------------------- | ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------- |
| Search                             | 6                  | 54 `neutral`                        | The Clear button's icon (`Clear › override icon-left > shape`): `Color/text-subtle` |
| `.input and label` (Checkbox page) | 2                  | 62 `neutral`, 9 `danger`            | `outline=true`: stroke `Color/border-default`                                       |
| Details                            | 82                 | 40 `neutral`                        | `.Details.Header`: fill `Color/surface-default`                                     |
| Popover Trigger                    | 8                  | 7 `neutral`                         | `State=Focus` Popover: fill `Color/surface-default`                                 |
| Card                               | 32                 | 32 `neutral`                        | Root: fill `Color/surface-default`                                                  |
| Tag                                | 7                  | 2 `neutral`                         | Label: fill `Color/text-default`                                                    |
| TableColumn                        | 30                 | 2 `neutral`                         | `.cell and header`: stroke `Color/border-subtle`                                    |
| `.cell and header`                 | 21                 | 2 `neutral`                         | Sortable header: fill `Color/surface-active`                                        |
| Avatar                             | 4                  | 2 `danger`                          | Root: fill `Color/base-default`                                                     |
| `_tab elements base`               | 14                 | 6 `danger`, 3 `accent`, 2 `neutral` | `Variant=Card`: stroke `Color/border-subtle`                                        |
| FileUpload (Udir's own)            | 10                 | 78 `neutral`                        | Dropzone: fill `Color/surface-default`                                              |

Search and the checkbox look like omissions: in code, both are neutral.

## 4. Spacing and sizes

`compare` reports a layer bound to another size variable as a changed fact, for example `boundVariables[paddingLeft]: "Semantic/size/3" → "Semantic/size/4"` (Digdir first, Udir second). 221 layer properties are bound to a different size step in the two libraries:

| Component                                                                                   | Difference (Digdir → Udir)                                                                                         |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Textfield                                                                                   | Field padding left and right `size/3` → `size/4`; gap between label and description `size/0` → `size/1`            |
| Search                                                                                      | Field padding left `size/3` → `size/4`; label/description gap `size/0` → `size/1`                                  |
| Icon button                                                                                 | Icon `size/6` → `size/7`, as in Udir's CSS (`button.css` sets `--ds-icon-size: var(--ds-size-7)` for icon buttons) |
| Switch, Radio, Checkbox, Textarea, Select, Suggestion, Multi suggestion, `.input and label` | Label/description gap `size/0` → `size/1`                                                                          |
| Suggestion, Multi suggestion                                                                | Gap in the input's right content `size/1` and `size/2` → `size/0`                                                  |
| `.Item in suggestion`                                                                       | Gap `size/2` → `size/1`, padding left and right `size/3` → `size/2`                                                |
| Error summary                                                                               | Padding `size/7` → `size/6` (top, bottom) and `size/8` (left, right)                                               |
| List                                                                                        | Padding left of the list `size/1` → `size/0`                                                                       |

Udir's `header.css` keeps the spacing before the search icon in the header search "from before Digdir 1.23.0", so Digdir changed search field spacing in 1.23.0. The Search padding difference may therefore be a Digdir change Udir hasn't applied, not a Udir decision.

This only covers layers that exist under the same path in both libraries. Where layers, variants or components are named or structured differently (Checkbox, Textfield and Radio have thousands of facts on one side only), spacing can't be compared automatically; those components need to be looked at in Figma, or have their layer names aligned first.

## 5. Bindings to deleted variables

Udir's library has about 740 bindings to 14 variables that no longer exist in their collection. They keep the value they had, but don't follow the current variables or the size modes. Several have the same name as a current variable, so they were probably left behind when variables were recreated.

| Deleted variable                           | Bindings | Mostly in                                                            |
| ------------------------------------------ | -------- | -------------------------------------------------------------------- |
| `Theme/font-family`                        | 168      | Button, Header, Textfield, FileUpload, Radio, Card, Search, Checkbox |
| `Theme/font-weight/medium`                 | 161      | The same                                                             |
| `Semantic/border-width/highlight`          | 156      | Chip, `.input and label`, `.input radio`, `.Item in multiselect`     |
| `Size/font-size/4`                         | 126      | Button, Textfield, FileUpload, Radio, Search, Checkbox               |
| `Semantic/spacing/5`                       | 60       | `.Details.Header`                                                    |
| `Size/font-size/5`                         | 22       | Header                                                               |
| `Size/font-size/7`                         | 14       | Card, `_LinkCard title`, DemoBanner                                  |
| `Semantic/spacing/2`                       | 13       | Multisuggestion, Suggestion, `.table-avatar`, `.Slot component`      |
| `Theme/font-weight/semibold`               | 5        | `.cell and header`                                                   |
| `Semantic/spacing/3`, `/4`, `/6`           | 6        | `.Slot component`, ButtonGroup                                       |
| `Semantic/color/accent/background-default` | 2        | `.fargeklatt`                                                        |
| `Theme/font-weight/regular`                | 1        | Textfield                                                            |

Digdir v1.23.0 has one: Link is bound to `Color scheme/global/purple/12`.

## 6. Variables

- **Code syntax:** 96 of Udir's Semantic color variables have code syntax without the color name (`var(--ds-color-base-default)`, where Digdir has `var(--ds-color-accent-base-default)`). `border-width/default`, `border-width/focus` and `opacity/disabled` in Semantic, the whole Color collection (16) and the font sizes in the Size collection (10) have no code syntax in Udir.
- **Scopes:** Udir's `font-size/1`–`10` have the scope `ALL_SCOPES`, where Digdir has `FONT_SIZE`, so Figma offers them for every property.

## 7. Components rebuilt with slots

Card is marked as rebuilt in the rules: its differences (5,284 facts) are only counted. `.Details.Header`, Dialog and `.cell and header` also use slots, which Digdir's library doesn't. Should they be marked as rebuilt too? Their differences would then also only be counted, but instances of color-restricted components in them are still checked.

## 8. Names and variants to confirm

In the rules:

- Component renames: AvatarStack, ErrorSummary, IconButton, IconToggleGroup, Multisuggestion, Popover Trigger, SkipLink/neutral (Digdir: Avatar stack, Error summary, Icon button, Icon toggle group, Multi suggestion, Popover.Trigger, Skip link).
- Heading and Paragraph sizes `large` → `lg` and so on; `.ToggleGroup.Button` property `variant` → `type`.
- Variable and mode names `udir` → `starter-theme`, `support1` → `brand1`, `support2` → `brand2`.

Not in the rules yet:

- `.Scalable checkmark` in Udir and `.Scalable checkmark/medium` in Digdir: the same component?
- `.input radio`: Udir's `state` and Digdir's `type`, with `default` and `Default`.
- `_tab elements base`: Udir's `Hover`/`Active` and Digdir's `hover`/`active`; Udir also has a `Variant` property (`Card`, `Default`).
- Avatar and Avatar stack: Digdir has a `square` property, Udir doesn't.
- Paragraph: Digdir has `weight=medium` variants, Udir doesn't.

## 9. Largest remaining differences

With the rules applied, about 134,500 facts remain (variables in the Theme and Color scheme collections left out). The largest, apart from Udir's own components (Header, the logos, Footer, FileUpload, FileCard, TableOfContents, FormSummary, FormNavigation):

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
