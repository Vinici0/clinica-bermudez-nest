# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with clean npm cache afterwards
RUN npm ci && npm cache clean --force

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build the application and clean up
RUN npm run build && npm prune --production

# Production stage
FROM node:18-alpine AS production

# Set environment variables
ENV NODE_ENV=production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose the port the app will run on
EXPOSE 3001

# The CMD will be overridden in docker-compose.yml
CMD ["node", "dist/main.js"]