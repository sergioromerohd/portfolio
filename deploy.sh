#!/bin/bash
# deploy.sh — pull main + rebuild + restart
# Llamado por /etc/cron.d/portfolio cada 5 min

set -e
LOG=/var/log/portfolio-deploy.log
touch "$LOG" 2>/dev/null || LOG=/tmp/portfolio-deploy.log
touch "$LOG"
exec >> "$LOG" 2>&1

cd /var/lib/casaos/apps/sparkling_felix
echo "--- $(date -Iseconds) deploy check ---"

git fetch origin main --quiet
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "no changes ($LOCAL)"
  exit 0
fi

echo "new commit $REMOTE (was $LOCAL), redeploy"
git reset --hard origin/main --quiet
docker compose -f /var/lib/casaos/apps/sparkling_felix/docker-compose.yml build main_app --quiet
docker compose -f /var/lib/casaos/apps/sparkling_felix/docker-compose.yml up -d main_app
docker image prune -f --filter "until=24h" >/dev/null 2>&1 || true
echo "deploy OK"

