# Stage 1: Build
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun --bun run build

# Stage 2: Production
FROM oven/bun:1-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Copy package.json for potential runtime dependencies
COPY --from=builder /app/package.json ./

# Expose port 3000 (default SvelteKit port)
EXPOSE 80

# Start the server with bun
CMD ["bun", "./build/index.js"]

