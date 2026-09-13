FROM oven/bun:1 AS builder

WORKDIR  /app

COPY package.json bun.lock ./

RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]