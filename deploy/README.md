# Deploy en CasaOS

## Pipeline
```
git push origin main
   ↓
GitHub Actions CI (lint + typecheck + build) ✓
   ↓
GitHub Actions CD (docker buildx → push a ghcr.io/sergioromerohd/portfolio:latest)
   ↓
Watchtower en el server (cada 5 min) detecta nueva imagen
   ↓
docker compose pull main_app && recreate con healthcheck
   ↓
portfolio actualizado en cv.sergioromerohd.com
```

## Setup inicial (one-time)

1. **Crear PAT con scope `read:packages`** para que el server pueda hacer pull
   de `ghcr.io` (los packages privados lo requieren).
   - GitHub → Settings → Developer settings → PAT (classic) → scopes: `read:packages`
   - Guardar en `/root/.docker/config.json` o variable de entorno `CR_PAT`

2. **Login ghcr en el server** (one-time):
   ```bash
   docker login ghcr.io -u sergioromerohd -p <CR_PAT>
   ```

3. **Backup del compose actual**:
   ```bash
   cp /var/lib/casaos/apps/sparkling_felix/docker-compose.yml \
      /var/lib/casaos/apps/sparkling_felix/docker-compose.yml.bak
   ```

4. **Aplicar el nuevo compose** (ver `casaos-docker-compose.yml`):
   ```bash
   cp deploy/casaos-docker-compose.yml \
      /var/lib/casaos/apps/sparkling_felix/docker-compose.yml
   cd /var/lib/casaos/apps/sparkling_felix
   docker compose pull main_app      # trae ghcr.io/sergioromerohd/portfolio:latest
   docker compose up -d              # arranca portfolio + watchtower
   ```

5. **Verificar Watchtower**:
   ```bash
   docker logs -f watchtower
   # debe decir: "Polling every 5 minutes" + el container sparkling_felix-main_app-1 detectado
   ```

## Manuales

```bash
# Forzar update inmediato (sin esperar 5 min)
docker exec watchtower sh -c "wget -qO- http://127.0.0.1:8080/v1/update"

# Logs del portfolio
docker logs -f sparkling_felix-main_app-1

# Rollback al estado previo
cp /var/lib/casaos/apps/sparkling_felix/docker-compose.yml.bak \
   /var/lib/casaos/apps/sparkling_felix/docker-compose.yml
cd /var/lib/casaos/apps/sparkling_felix
docker compose up -d
```

## Anti-patterns (NO hacer)

- ❌ NO `docker compose up` desde la rama local en el server — todo va por git+CI
- ❌ NO commitear `.env` (no hay vars secretas en el portfolio, pero si las hay, secrets en GitHub)
- ❌ NO `docker build` local en el server (lento, inconsistente)
- ❌ NO tocar la imagen `:latest` con tag manual desde local

## Variables de entorno (futuro)
Si más adelante se necesitan (analytics keys, etc), se añaden como GitHub Secrets
y se inyectan en el workflow CD con `docker build --build-arg`.
