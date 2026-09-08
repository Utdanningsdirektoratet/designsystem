# Build from the repository root, not from this directory:
#
#     docker build -f test-apps/nextjs/Dockerfile -t test-app-nextjs .
#     docker run --rm -p 3000:3000 test-app-nextjs
#
# The app is then served on http://localhost:3000.
#
# The app is part of the pnpm workspace, so the build needs the root manifest,
# `pnpm-lock.yaml` and the `@udir-design/*` packages. Docker cannot COPY files
# from outside the build context, so `../..` paths are not an option.

ARG PNPM_VERSION=12

# ============================================
# Stage 1: Build
# ============================================
FROM ghcr.io/pnpm/pnpm:${PNPM_VERSION} AS builder

WORKDIR /app

COPY . .

# The image ships without Node.js; pnpm downloads the version pinned by
# `devEngines.runtime` in the root `package.json`.
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm turbo run build --filter=test-app-nextjs

# ============================================
# Stage 2: Run — minimal image with standalone output only
# ============================================
FROM debian:stable-slim AS runner

# The Debian base has no unprivileged `node` user to drop to.
RUN groupadd --gid 1000 node && useradd --uid 1000 --gid node --create-home node

WORKDIR /app

# The exact runtime pnpm installed from `devEngines.runtime`, so the Node.js
# version stays declared in one place only.
COPY --from=builder /app/node_modules/.pnpm/node@runtime+*/node_modules/node/bin/node /usr/local/bin/node

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone output (includes server.js + required node_modules)
COPY --from=builder --chown=node:node /app/test-apps/nextjs/public ./test-apps/nextjs/public
COPY --from=builder --chown=node:node /app/test-apps/nextjs/.next/standalone ./
COPY --from=builder --chown=node:node /app/test-apps/nextjs/.next/static ./test-apps/nextjs/.next/static

USER node

EXPOSE 3000

CMD ["node", "test-apps/nextjs/server.js"]
