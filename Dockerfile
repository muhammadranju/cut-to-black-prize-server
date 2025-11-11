# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build || true

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Create uploads directory for submissions
RUN mkdir -p /app/uploads/submissions

# Expose port (adjust based on your app's port)
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/server.js"]
