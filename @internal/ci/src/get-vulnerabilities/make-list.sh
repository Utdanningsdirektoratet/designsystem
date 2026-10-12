#!/usr/bin/env bash
## Prints Slack block kit lists of the security advisories that `pnpm audit` reports for the
## lockfile, most severe first, each with a sub-bullet naming the workspace projects that use it.
## Slack nests lists by alternating `rich_text_list` elements with different indents.
set -o pipefail

# `pnpm audit` exits non-zero whenever it finds vulnerabilities, so judge success by whether the
# output is an audit report instead.
AUDIT=$(pnpm audit --json)
jq -e 'has("advisories")' <<<"$AUDIT" >/dev/null 2>&1 || {
  echo "$AUDIT" >&2
  exit 1
}

# Map each vulnerable "package@version" to the workspace projects that depend on it. The paths in
# the audit report can't be used for this, since pnpm caps them at 100 per advisory. An empty
# result means `pnpm why` found nothing, for example because dependencies aren't installed.
PROJECTS=$(
  jq -r '.advisories[] | "\(.module_name)@\(.findings[].version)"' <<<"$AUDIT" | sort -u |
    while read -r spec; do
      pnpm why "$spec" -r --json | jq -c --arg spec "$spec" '
        [.. | objects | select(has("depField")) | .name] | unique
        | if length == 0 then error("no workspace project depends on \($spec)") else {($spec): .} end
      ' || exit 1
    done | jq -s 'add // {}'
) || exit 1

jq -c --argjson projects "$PROJECTS" '
def rank: {critical: 0, high: 1, moderate: 2, low: 3, info: 4}[.] // 5;
def norwegian: {critical: "kritisk", high: "høy", moderate: "moderat", low: "lav", info: "info"}[.] // .;
.advisories | map(.) | sort_by((.severity | rank), .module_name) | map(
  .module_name as $name
  | ([.findings[].version] | unique) as $versions
  | {type: "rich_text_list", style: "bullet", indent: 0, elements: [{type: "rich_text_section", elements: [
      { type: "text", text: $name, style: { bold: true }},
      { type: "text", text: " \($versions | map("v\(.)") | join(", ")) (\(.severity | norwegian)): " },
      { type: "link", url: .url, text: .title },
      { type: "text", text: (if .patched_versions then " – fikset i \(.patched_versions)" else " – ingen fiks publisert" end) }
    ]}]},
    {type: "rich_text_list", style: "bullet", indent: 1, elements: [{type: "rich_text_section", elements: [
      { type: "text", text: "Brukes i: \([$versions[] | $projects["\($name)@\(.)"][]] | unique | join(", "))" }
    ]}]}
)' <<<"$AUDIT"
