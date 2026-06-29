#!/usr/bin/env bash
## Creates a Slack message payload which lists dependencies
## which are outdated by one or more major versions
CURRENT_DIR=${BASH_SOURCE%/*}
OUTDATED_MAJORS="$($CURRENT_DIR/../src/get-outdated-majors/make-list.sh)"
echo "$(/usr/bin/env -S pnpm tsx $CURRENT_DIR/../src/get-outdated-majors/slack-message-template.ts "$OUTDATED_MAJORS")"

