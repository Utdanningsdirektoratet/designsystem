#!/usr/bin/env bash
if [[ $(pnpm nx show projects --affected --projects $1 | tr -d '\n') == $1 ]]; then
  printf true;
else
  printf false;
fi
