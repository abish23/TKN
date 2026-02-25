# Stage 1: Angular Build
FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build --configuration production

# Stage 2: Nginx für Auslieferung
FROM nginx:alpine
COPY --from=build /app/dist/tkn/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]