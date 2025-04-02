#!/usr/bin/env bash
shopt -s globstar
printf 'Merging this PR will release the following version and changes:\n\n'
cat CHANGELOG.md

