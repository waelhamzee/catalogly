FROM node:22-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-http://localhost:8080/api}

ARG VITE_S3_BUCKET
ENV VITE_S3_BUCKET=${VITE_S3_BUCKET}

ARG VITE_AWS_REGION
ENV VITE_AWS_REGION=${VITE_AWS_REGION}

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
