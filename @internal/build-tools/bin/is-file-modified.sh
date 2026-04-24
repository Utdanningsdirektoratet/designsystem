#!/usr/bin/env bash
echo $(pwd)
NX_BASE="${NX_BASE:-main}"
NX_HEAD="${NX_HEAD:-HEAD}"
git diff --quiet --merge-base $NX_BASE $NX_HEAD $1
EXIT_CODE=$?
if [[ $EXIT_CODE == 1 ]]; then
  printf true;
else
  printf false;
fi
