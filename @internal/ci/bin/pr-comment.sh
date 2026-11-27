#!/usr/bin/env bash
# Create or update the pull request comment identified by <name>, with the body read from stdin,
# or delete it with --delete. Unlike `gh pr comment --edit-last`, which edits whichever comment
# github-actions[bot] posted last, this lets each workflow keep its own comment.
#
# Usage: pr-comment.sh <pr-number> <name> < body.md
#        pr-comment.sh --delete <pr-number> <name>
set -euo pipefail

delete=false
if [ "${1:-}" = --delete ]; then
  delete=true
  shift
fi
pr=$1
marker="<!-- pr-comment: $2 -->"
comments="repos/$GITHUB_REPOSITORY/issues/$pr/comments"

ids=$(gh api --paginate "$comments" \
  --jq ".[] | select(.user.login == \"github-actions[bot]\" and (.body | startswith(\"$marker\"))) | .id")
id=${ids%%$'\n'*}

if [ "$delete" = true ]; then
  if [ -n "$id" ]; then
    gh api -X DELETE "repos/$GITHUB_REPOSITORY/issues/comments/$id" >/dev/null
  fi
elif [ -n "$id" ]; then
  { echo "$marker"; cat; } | gh api -X PATCH "repos/$GITHUB_REPOSITORY/issues/comments/$id" -F body=@- >/dev/null
else
  { echo "$marker"; cat; } | gh api -X POST "$comments" -F body=@- >/dev/null
fi
