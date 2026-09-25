#!/usr/bin/env bash
# Asserts scheduled runs fail closed without a fallback when the Anthropic key is absent.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SCRIPT="$ROOT/content-factory/scripts/decide-generation-mode.sh"

assert_case() {
  local name="$1"
  local expect_status="$2"
  local expect_mode="$3"
  local expect_run="$4"
  shift 4

  local out
  out="$(mktemp)"
  set +e
  env GITHUB_OUTPUT="$out" "$@" bash "$SCRIPT" >/dev/null
  local status=$?
  set -e

  local mode run
  mode="$(sed -n 's/^mode=//p' "$out" | tail -1)"
  run="$(sed -n 's/^run=//p' "$out" | tail -1)"
  rm -f "$out"

  if [ "$status" != "$expect_status" ] || [ "$mode" != "$expect_mode" ] || [ "$run" != "$expect_run" ]; then
    echo "FAIL $name: status=$status mode=$mode run=$run (expected status=$expect_status mode=$expect_mode run=$expect_run)" >&2
    exit 1
  fi
  echo "ok $name"
}

# Publish day (anchor) and the following off day.
PUBLISH_DAY="2026-07-06"
OFF_DAY="2026-07-07"

assert_case "schedule publish day missing key fails closed" 1 missing-key false \
  EVENT_NAME=schedule CONTENT_FACTORY_NOW="$PUBLISH_DAY" ANTHROPIC_API_KEY=

assert_case "schedule publish day whitespace key fails closed" 1 missing-key false \
  EVENT_NAME=schedule CONTENT_FACTORY_NOW="$PUBLISH_DAY" ANTHROPIC_API_KEY='   '

assert_case "schedule publish day with key uses claude" 0 claude true \
  EVENT_NAME=schedule CONTENT_FACTORY_NOW="$PUBLISH_DAY" ANTHROPIC_API_KEY=sk-test

assert_case "schedule off day skips before key check" 0 skip-eod false \
  EVENT_NAME=schedule CONTENT_FACTORY_NOW="$OFF_DAY" ANTHROPIC_API_KEY=

assert_case "schedule off day with key still skips" 0 skip-eod false \
  EVENT_NAME=schedule CONTENT_FACTORY_NOW="$OFF_DAY" ANTHROPIC_API_KEY=sk-test

assert_case "manual dispatch without key is intentional fallback" 0 fallback-only true \
  EVENT_NAME=workflow_dispatch ANTHROPIC_API_KEY= INPUT_MOCK=false PUBLISH_MOCK=false

assert_case "manual mock publish" 0 mock true \
  EVENT_NAME=workflow_dispatch ANTHROPIC_API_KEY= INPUT_MOCK=true PUBLISH_MOCK=true

assert_case "manual mock without publish is test-only" 0 test-only false \
  EVENT_NAME=workflow_dispatch ANTHROPIC_API_KEY= INPUT_MOCK=true PUBLISH_MOCK=false

assert_case "manual with key prefers claude over mock" 0 claude true \
  EVENT_NAME=workflow_dispatch ANTHROPIC_API_KEY=sk-test INPUT_MOCK=true PUBLISH_MOCK=true

assert_case "non-dispatch without key skips" 0 skip false \
  EVENT_NAME=push ANTHROPIC_API_KEY=

echo "✅ decide-generation-mode.test.sh passed"
