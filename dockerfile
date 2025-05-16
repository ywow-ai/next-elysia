# Stage 1: Build stage pakai image Bun resmi
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy file package dan bun.lockb
COPY package.json bun.lockb ./

# Install dependencies dengan Bun
RUN bun install

# Copy semua source code
COPY . .

# Build project Next.js
RUN bun run build

# Stage 2: Production image
FROM oven/bun:latest

WORKDIR /app

# Copy hasil build dari stage builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose port default Next.js
EXPOSE 3000

# Jalankan Next.js dengan Bun
CMD ["bun", "run", "start"]
