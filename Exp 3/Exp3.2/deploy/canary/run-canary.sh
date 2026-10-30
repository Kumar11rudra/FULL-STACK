#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
COMPOSE=(docker compose -f deploy/canary/compose.yml)
cp deploy/canary/canary.conf deploy/canary/active.conf
cleanup() { "${COMPOSE[@]}" down --remove-orphans || true; }
trap cleanup EXIT
"${COMPOSE[@]}" up -d --remove-orphans

echo "Waiting for demo canary gateway..."
ready=0
for i in $(seq 1 70); do
  if curl -fsS http://127.0.0.1:8088/api/version >/dev/null 2>&1; then ready=1; break; fi
  sleep 2
done
if [[ "$ready" != 1 ]]; then
  "${COMPOSE[@]}" logs --tail=100
  echo "ERROR: gateway did not become ready" >&2
  exit 1
fi

stable=0; canary=0
for i in $(seq 1 60); do
  response="$(curl -fsS http://127.0.0.1:8088/api/version)"
  case "$response" in
    *'"version":"stable"'*) stable=$((stable+1)) ;;
    *'"version":"canary"'*) canary=$((canary+1)) ;;
    *) echo "Unexpected response: $response" >&2; exit 1 ;;
  esac
done
echo "Canary routing hits: stable=$stable canary=$canary (60 requests)"
if (( stable < 25 || canary < 4 )); then
  echo "ERROR: expected BOTH stable majority and canary minority" >&2
  exit 1
fi

# Overwrite mounted file contents in-place so the bind mount remains valid.
cat deploy/canary/promoted.conf > deploy/canary/active.conf
"${COMPOSE[@]}" exec -T gateway nginx -s reload
sleep 2
for i in $(seq 1 15); do
  response="$(curl -fsS http://127.0.0.1:8088/api/version)"
  if [[ "$response" != *'"version":"canary"'* ]]; then
    echo "ERROR: promotion did not route to canary: $response" >&2
    exit 1
  fi
done
echo "PASS: Promoted release receives 100% of smoke-test requests."
