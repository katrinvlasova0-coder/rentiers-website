#!/usr/bin/env bash
# Decide content-factory generation mode for GitHub Actions.
# Writes mode and run to $GITHUB_OUTPUT.
# Exit 1 on a scheduled publish day when ANTHROPIC_API_KEY is missing/empty
# so the job fails closed and does not publish a fallback-* article.
# Manual workflow_dispatch may still choose mock, test-only, or fallback-only.
set -euo pipefail

if [ -z "${GITHUB_OUTPUT:-}" ]; then
  echo "GITHUB_OUTPUT is required" >&2
  exit 2
fi

HAS_ANTHROPIC="false"
# Treat missing, empty, and whitespace-only secrets as unset.
KEY_TRIMMED="${ANTHROPIC_API_KEY:-}"
KEY_TRIMMED="${KEY_TRIMMED//[[:space:]]/}"
if [ -n "$KEY_TRIMMED" ]; then
  HAS_ANTHROPIC="true"
fi

INPUT_MOCK="${INPUT_MOCK:-}"
PUBLISH_MOCK="${PUBLISH_MOCK:-}"
EVENT_NAME="${EVENT_NAME:-}"
IS_SCHEDULE="false"
if [ "$EVENT_NAME" = "schedule" ]; then
  IS_SCHEDULE="true"
fi

# Every other day on schedule (anchor: 2026-07-06 = first publish day).
# CONTENT_FACTORY_NOW=YYYY-MM-DD overrides "today" for tests.
if [ "$IS_SCHEDULE" = "true" ]; then
  if [ -n "${CONTENT_FACTORY_NOW:-}" ]; then
    TODAY_EPOCH=$(date -u -d "$CONTENT_FACTORY_NOW" +%s)
  else
    TODAY_EPOCH=$(date -u +%s)
  fi
  ANCHOR_DAY=$(( $(date -u -d "2026-07-06" +%s) / 86400 ))
  TODAY_DAY=$(( TODAY_EPOCH / 86400 ))
  if [ $(( (TODAY_DAY - ANCHOR_DAY) % 2 )) -ne 0 ]; then
    echo "mode=skip-eod" >> "$GITHUB_OUTPUT"
    echo "run=false" >> "$GITHUB_OUTPUT"
    echo "⏭️ Every-other-day schedule: no article today (next run tomorrow 08:00 UTC)"
    exit 0
  fi
  echo "📅 Every-other-day schedule: publish day"
fi

if [ "$HAS_ANTHROPIC" = "true" ]; then
  echo "mode=claude" >> "$GITHUB_OUTPUT"
  echo "run=true" >> "$GITHUB_OUTPUT"
  echo "✅ Claude API available — real article generation"
elif [ "$IS_SCHEDULE" = "true" ]; then
  # Cron must not ship fallback-* when Claude is unavailable.
  echo "mode=missing-key" >> "$GITHUB_OUTPUT"
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "::error::ANTHROPIC_API_KEY secret missing/empty — scheduled publish skipped (no fallback article). Add GitHub → Settings → Secrets and variables → Actions → ANTHROPIC_API_KEY (optional ANTHROPIC_MODEL)."
  exit 1
elif [ "$EVENT_NAME" = "workflow_dispatch" ]; then
  # Manual only: mock publish, test-only, or intentional fallback-only safety net.
  if [ "$INPUT_MOCK" = "true" ] && [ "$PUBLISH_MOCK" = "true" ]; then
    echo "mode=mock" >> "$GITHUB_OUTPUT"
    echo "run=true" >> "$GITHUB_OUTPUT"
    echo "🧪 Manual mock publish enabled (test content only)"
  elif [ "$INPUT_MOCK" = "true" ]; then
    echo "mode=test-only" >> "$GITHUB_OUTPUT"
    echo "run=false" >> "$GITHUB_OUTPUT"
    echo "🧪 Mock selected but publish_mock=false — only integration test will run"
  else
    echo "mode=fallback-only" >> "$GITHUB_OUTPUT"
    echo "run=true" >> "$GITHUB_OUTPUT"
    echo "⚠️ ANTHROPIC_API_KEY missing — manual run will publish a safe fallback article"
  fi
elif [ "$INPUT_MOCK" = "true" ] && [ "$PUBLISH_MOCK" = "true" ]; then
  echo "mode=mock" >> "$GITHUB_OUTPUT"
  echo "run=true" >> "$GITHUB_OUTPUT"
  echo "🧪 Manual mock publish enabled (test content only)"
elif [ "$INPUT_MOCK" = "true" ]; then
  echo "mode=test-only" >> "$GITHUB_OUTPUT"
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "🧪 Mock selected but publish_mock=false — only integration test will run"
else
  echo "mode=skip" >> "$GITHUB_OUTPUT"
  echo "run=false" >> "$GITHUB_OUTPUT"
  echo "⏭️ No ANTHROPIC_API_KEY and mock not enabled — generation skipped"
fi
