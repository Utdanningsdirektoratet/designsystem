#!/usr/bin/env bash
# Check if a file (or glob) has been modified between the SCM base and HEAD.
# Usage: is-file-modified.sh <path-or-glob>
#
# Respects TURBO_SCM_BASE (set in CI) or falls back to "main".
# Outputs "true" or "false".

BASE="${TURBO_SCM_BASE:-main}"

git diff --quiet --merge-base "$BASE" HEAD -- "$1"
EXIT_CODE=$?
if [[ $EXIT_CODE == 1 ]]; then
  printf true;
else
  printf false;
fi
