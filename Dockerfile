FROM node:20-alpine AS builder
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
COPY nx.json project.json tsconfig.json ./
COPY apps ./apps
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN npx nx build challenge-app --configuration=production

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /workspace/dist/apps/challenge-app/browser ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
