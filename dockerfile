# --- STAGE 1: Build ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install deps (gunakan cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Salin semua source code
COPY . .

# (Opsional) Jalankan prisma generate
# RUN yarn prisma generate

# Build Next.js
RUN yarn build

# --- STAGE 2: Production ---
FROM node:18-alpine

WORKDIR /app

# Hanya salin yang dibutuhkan untuk production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# (Opsional) .env jika dibutuhkan di runtime
# COPY --from=builder /app/.env ./

# Expose port default Next.js
EXPOSE 3000

# Jalankan Next.js
CMD ["yarn", "start"]
