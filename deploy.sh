#!/bin/bash
# deploy.sh — pull main + rebuild + restart
# Llamado por /etc/cron.d/portfolio cada 5 min

set -e
LOG=/var/log/portfolio-deploy.log
touch "$LOG" 2>/dev/null || LOG=/tmp/portfolio-deploy.log
touch "$LOG"
exec >> "$LOG" 2>&1

APP=/var/lib/casaos/apps/sparkling_felix
cd "$APP"
echo "--- $(date -Iseconds) deploy check ---"

# pull (fast-forward o rebase). Si no hay red, falla limpio.
if ! git pull --rebase --autostash origin main 2>&1; then
  echo "ERROR: git pull failed"
  exit 1
fi
echo "HEAD: $(git rev-parse HEAD)"

# rebuild SIEMPRE: --pull=false para usar cache local,
# pero rebuild garantiza que la imagen refleja el working tree.
# Coste: ~30-60s con cache caliente, ~3min cold.
echo "building..."
docker compose -f "$APP/docker-compose.yml" build main_app 2>&1
echo "restarting..."
docker compose -f "$APP/docker-compose.yml" up -d main_app 2>&1
docker image prune -f --filter "until=24h" >/dev/null 2>&1 || true
echo "OK"
