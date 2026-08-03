#!/usr/bin/env bash
## Prints a list (in Slack's block kit format) of dependencies which are outdated by one or more major versions.
## Ignores dependencies in test-* projects.

# Fetch the Node.js release schedule. Retries with exponential backoff on transient failures.
NODE_SCHEDULE=$(curl -sf --retry 10 https://raw.githubusercontent.com/nodejs/Release/main/schedule.json) || exit 1

# Find the highest Node major that has entered LTS as of today
LATEST_NODE_LTS_MAJOR=$(jq -c --null-input --argjson schedule "$NODE_SCHEDULE" '$schedule | to_entries
  | map(select(.value.lts // "" | . != "" and . <= (now | strftime("%Y-%m-%d"))))
  | map(.key | ltrimstr("v") | tonumber)
  | max // 0
') || exit 1
LATEST_NODE_LTS_VERSION=$(pnpm view node@$LATEST_NODE_LTS_MAJOR version) || exit 1
LATEST_TYPES_NODE_LTS_VERSION=$(pnpm view @types/node@$LATEST_NODE_LTS_MAJOR version) || exit 1

pnpm outdated --filter "!test-*" --format=json | jq -c \
  --arg latest_node_lts_major "$LATEST_NODE_LTS_MAJOR" \
  --arg latest_node_lts_version "$LATEST_NODE_LTS_VERSION" \
  --arg latest_types_node_lts_version "$LATEST_TYPES_NODE_LTS_VERSION" '
to_entries | map(
  { name: .key, current_full: .value.current, latest_full: .value.latest} + .value
  | (.current, .latest) |= (split(".").[0])
  | if .name == "node" then
      (.latest = $latest_node_lts_major) | (.latest_full = $latest_node_lts_version)
    elif .name == "@types/node" then
      (.latest = $latest_node_lts_major) | (.latest_full = $latest_types_node_lts_version)
    else . end
  | select(.current < .latest)
  | {type: "rich_text_section", elements: [
      { type: "text", text: .name, style: { bold: true }},
      { type: "text", text: ": " },
      { type: "text", text: "v\(.current_full)", style: { strike: true }},
      { type: "text", text: " → v\(.latest_full)"}
    ]}
)'
