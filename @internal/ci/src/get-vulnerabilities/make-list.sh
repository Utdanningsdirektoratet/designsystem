#!/usr/bin/env bash
## Prints Slack block kit lists of the Dependabot alerts that were opened or reopened since this
## workflow last succeeded, most severe first, each with a sub-bullet naming where it is used.
## Slack nests lists by alternating `rich_text_list` elements with different indents.
## Reads `GITHUB_REPOSITORY` and `GITHUB_RUN_ID`, which GitHub Actions sets.
set -o pipefail

# Report the alerts that changed between the start of the last successful run and the start of
# this one. Consecutive windows meet exactly, so when a scheduled run is delayed or dropped, or
# posting to Slack fails, the next run covers the gap instead of losing alerts.
RUN=$(gh api "repos/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID") || exit 1
UNTIL=$(jq -r .run_started_at <<<"$RUN")
SINCE=$(
  gh api "repos/$GITHUB_REPOSITORY/actions/workflows/$(jq -r .workflow_id <<<"$RUN")/runs?status=success&per_page=100" \
    --jq "[.workflow_runs[] | select(.id != $GITHUB_RUN_ID) | .run_started_at] | max // \"\""
) || exit 1

# Filter on `updated_at` rather than `created_at`: when a fixed vulnerability is reintroduced,
# GitHub reopens the existing alert, which keeps its original creation time.
ALERTS=$(
  gh api --paginate "repos/$GITHUB_REPOSITORY/dependabot/alerts?state=open&per_page=100" |
    jq -s --arg since "$SINCE" --arg until "$UNTIL" \
      'add // [] | map(select(.updated_at >= $since and .updated_at < $until))'
) || exit 1

# Map each alert in `pnpm-lock.yaml` to the installed versions in its vulnerable range and the
# workspace projects that depend on them. An empty result means `pnpm why` found nothing, for
# example because dependencies aren't installed.
USAGE=$(
  jq -r '.[] | select(.dependency.manifest_path == "pnpm-lock.yaml")
    | "\(.number)\t\(.dependency.package.name)@\(.security_vulnerability.vulnerable_version_range | gsub(",\\s*"; " "))"
  ' <<<"$ALERTS" |
    while IFS=$'\t' read -r number spec; do
      pnpm why "$spec" -r --json | jq -c --arg number "$number" --arg spec "$spec" '
        {versions: ([.[].version] | unique), projects: ([.. | objects | select(has("depField")) | .name] | unique)}
        | if .projects == [] then error("no workspace project depends on \($spec)") else {($number): .} end
      ' || exit 1
    done | jq -s 'add // {}'
) || exit 1

jq -c --argjson usage "$USAGE" '
def rank: {critical: 0, high: 1, medium: 2, low: 3}[.] // 4;
def norwegian: {critical: "kritisk", high: "høy", medium: "moderat", low: "lav"}[.] // .;
sort_by((.security_advisory.severity | rank), .dependency.package.name) | map(
  $usage["\(.number)"] as $use
  | .security_vulnerability.first_patched_version.identifier as $patched
  | {type: "rich_text_list", style: "bullet", indent: 0, elements: [{type: "rich_text_section", elements: [
      { type: "text", text: .dependency.package.name, style: { bold: true }},
      { type: "text", text: " \(if $use then $use.versions | map("v\(.)") | join(", ") else .security_vulnerability.vulnerable_version_range end) (\(.security_advisory.severity | norwegian)): " },
      { type: "link", url: .html_url, text: .security_advisory.summary },
      { type: "text", text: (if $patched then " – fikset i v\($patched)" else " – ingen fiks publisert" end) }
    ]}]},
    {type: "rich_text_list", style: "bullet", indent: 1, elements: [{type: "rich_text_section", elements: [
      { type: "text", text: (if $use then "Brukes i: \($use.projects | join(", "))" else "Funnet i: \(.dependency.manifest_path)" end) }
    ]}]}
)' <<<"$ALERTS"
