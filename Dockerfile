# Stage 1: Build the application (for TypeScript compilation)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# Stage 2: Run the application (for the final, smaller image)
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/dist ./dist/

# Dòng CMD đã được cập nhật
CMD [ "node", "-r", "tsconfig-paths/register", "dist/app.js" ]