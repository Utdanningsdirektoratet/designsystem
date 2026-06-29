#!/usr/bin/env bash
## Prints a list (in Slack's block kit format) of dependencies which are outdated by one or more major versions.
## Ignores dependencies in test-* projects.
pnpm outdated --filter "!test-*" --format=json | jq -c 'to_entries | map(
  { name: .key, current_full: .value.current, latest_full: .value.latest} + .value
  | (.current, .latest) |= (split(".").[0])
  | select(.current < .latest)
  | {type: "rich_text_section", elements: [
      { type: "text", text: .name, style: { bold: true }},
      { type: "text", text: ": " },
      { type: "text", text: "v\(.current_full)", style: { strike: true }},
      { type: "text", text: " → v\(.latest_full)"}
    ]}
)'

