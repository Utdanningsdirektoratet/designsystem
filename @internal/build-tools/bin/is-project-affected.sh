#!/usr/bin/env bash
NX_BASE="${NX_BASE:-main}"
NX_HEAD="${NX_HEAD:-HEAD}"
if [[ $(pnpm nx show projects --affected --base $NX_BASE --head $NX_HEAD --projects $1 | grep -v "^info" | tr -d '\n') == $1 ]]; then
  printf true;
else
  printf false;
fi
