# Stage 1: Angular build
FROM node:24-alpine AS build
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Restliche Projektdateien kopieren und Angular bauen
COPY . .
RUN npx ng build --configuration production

# Stage 2: Nginx für die Auslieferung
FROM nginx:alpine
# Angular-Build-Dateien in Nginx kopieren
COPY --from=build /app/dist/tkn/browser /usr/share/nginx/html

# Eigene Nginx-Konfiguration kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]