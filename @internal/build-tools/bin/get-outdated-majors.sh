#!/usr/bin/env bash
## Prints a Markdown-formatted list of dependencies
## which are outdated by one or more major versions
pnpm outdated -r --format=json | jq -r 'to_entries[]
  | { name: .key, current_full: .value.current, latest_full: .value.latest} + .value
  | (.current, .latest) |= (split(".").[0])
  | select(.current < .latest)
  | "- **\(.name)**: ~v\(.current_full)~ → v\(.latest_full)"'
