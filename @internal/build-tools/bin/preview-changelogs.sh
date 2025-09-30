#!/usr/bin/env bash
shopt -s globstar
if [ -f ./CHANGELOG.md ]
then
  printf 'Merging this PR will release the following version and changes:\n\n'
  cat CHANGELOG.md
else
  echo 'This PR contains no publishable changes.'
fi
