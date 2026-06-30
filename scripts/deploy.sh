#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="${ROOT_DIR}/packages/web/dist"
REMOTE_USER="liuchen"
REMOTE_HOST="www.greatwebtech.cn"
REMOTE_PATH="/home/liuchen/pm2/little-cloud/dist"

cd "${ROOT_DIR}"

echo "Building web..."
pnpm build

if [[ ! -d "${DIST_DIR}" ]]; then
  echo "Build output not found: ${DIST_DIR}" >&2
  exit 1
fi

echo "Deploying to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"
rsync -avz --delete "${DIST_DIR}/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Deploy complete."
