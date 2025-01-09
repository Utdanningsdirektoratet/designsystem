#!/usr/bin/env bash
shopt -s globstar
printf 'Merging this PR will release the following versions and changes:\n\n'
find **/CHANGELOG.md \
  -exec bash -c "printf '# {}\n' | sed -e 's/\/CHANGELOG.md$//'" \; \
  -exec printf '\n' \; \
  -exec cat '{}' \; \
  -exec printf '\n' \; \

