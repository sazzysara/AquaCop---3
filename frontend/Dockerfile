# ─────────────────────────────────────────────────────────────
# AquaCop Frontend Dockerfile (Multi-Stage Standalone Build)
# Next.js 16 + React 19 on Node 20 Alpine with non-root security
# ─────────────────────────────────────────────────────────────

# Stage 1: Base Alpine with Node.js
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Stage 2: Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Client-side API URL during build (empty defaults to same-origin reverse-proxy)
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build || npm run build

# Stage 4: Minimal Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install curl for container health check
RUN apk add --no-cache curl

# Create non-root system user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server bundle
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Container health probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
