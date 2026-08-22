#!/usr/bin/env sh
set -eu

# npm also runs prepare in archive/CI contexts where .git may not exist.
if git rev-parse --git-dir >/dev/null 2>&1; then
  git config core.hooksPath .githooks
fi
