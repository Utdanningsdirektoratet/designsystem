ARG NODE_VERSION=24-slim

# ============================================
# Stage 1: Base — shared pnpm setup
# ============================================
FROM node:${NODE_VERSION} AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# ============================================
# Stage 2: Build
# ============================================
FROM base AS builder

WORKDIR /app

# Copy entire monorepo — pnpm with catalog needs pnpm-workspace.yaml,
# all workspace package.json files, patches, and the lockfile.
COPY . .

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

# Build with nx to resolve workspace dependency graph
RUN pnpm nx run test-apps/nextjs:build

# ============================================
# Stage 3: Run — minimal image with standalone output only
# ============================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone output (includes server.js + required node_modules)
COPY --from=builder --chown=node:node /app/test-apps/nextjs/public ./public
COPY --from=builder --chown=node:node /app/test-apps/nextjs/.next/standalone ./
COPY --from=builder --chown=node:node /app/test-apps/nextjs/.next/static ./test-apps/nextjs/.next/static

USER node

EXPOSE 3000

CMD ["node", "test-apps/nextjs/server.js"]
