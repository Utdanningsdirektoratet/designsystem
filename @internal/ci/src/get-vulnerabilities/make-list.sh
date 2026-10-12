#!/usr/bin/env bash
## Prints a list (in Slack's block kit format) of security advisories that `pnpm audit` reports
## for the lockfile, most severe first.

# `pnpm audit` exits non-zero whenever it finds vulnerabilities, so judge success by whether the
# output is an audit report instead.
AUDIT=$(pnpm audit --json)
jq -e 'has("advisories")' <<<"$AUDIT" >/dev/null 2>&1 || {
  echo "$AUDIT" >&2
  exit 1
}

jq -c '
def rank: {critical: 0, high: 1, moderate: 2, low: 3, info: 4}[.] // 5;
def norwegian: {critical: "kritisk", high: "høy", moderate: "moderat", low: "lav", info: "info"}[.] // .;
.advisories | map(.) | sort_by((.severity | rank), .module_name) | map(
  {type: "rich_text_section", elements: [
    { type: "text", text: .module_name, style: { bold: true }},
    { type: "text", text: " \([.findings[].version] | unique | map("v\(.)") | join(", ")) (\(.severity | norwegian)): " },
    { type: "link", url: .url, text: .title },
    { type: "text", text: (if .patched_versions then " – fikset i \(.patched_versions)" else " – ingen fiks publisert" end) }
  ]}
)' <<<"$AUDIT"
