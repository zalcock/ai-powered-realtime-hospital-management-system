# Frontend Dockerfile for React Router v7 with SSR
FROM oven/bun:1 AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS production-dependencies-env
COPY ./package.json bun.lock /app/
WORKDIR /app
RUN bun install --production --frozen-lockfile

FROM oven/bun:1 AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules ./node_modules
WORKDIR /app
RUN bun run build

FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5173
ENV HOSTNAME="0.0.0.0"

# Create non-root user (Alpine)
RUN addgroup -g 1001 nodejs 2>/dev/null || getent group nodejs > /dev/null || (mkdir -p /app && true)
RUN adduser -u 1001 -G nodejs -D nodejs 2>/dev/null || getent passwd nodejs > /dev/null || true

COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/package.json ./package.json

# Set permissions
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5173

CMD ["bun", "run", "start"]