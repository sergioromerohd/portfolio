#!/bin/bash
# deploy.sh — pull main + rebuild + restart
# Llamado por /etc/cron.d/portfolio cada 5 min

set -e
cd /var/lib/casaos/apps/sparkling_felix

# pull (con rebase para no pelearse con commits remotos)
git fetch origin main --quiet
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  exit 0
fi

echo "[$(date -Iseconds)] portfolio: nuevo commit $REMOTE, redeploy"
git reset --hard origin/main --quiet

docker compose build main_app --quiet
docker compose up -d main_app
docker image prune -f --filter "until=24h" >/dev/null 2>&1 || true
echo "[$(date -Iseconds)] portfolio: deploy OK"
