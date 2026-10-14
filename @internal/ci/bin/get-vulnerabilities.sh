#!/usr/bin/env bash
## Creates a Slack message payload which lists security advisories reported by `pnpm audit`
CURRENT_DIR=${BASH_SOURCE%/*}
VULNERABILITIES="$($CURRENT_DIR/../src/get-vulnerabilities/make-list.sh)" || exit 1
echo "$(/usr/bin/env -S pnpm tsx $CURRENT_DIR/../src/get-vulnerabilities/slack-message-template.ts "$VULNERABILITIES")"
