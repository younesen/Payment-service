# ---------- 1. Build de l'application React ----------
FROM node:18-alpine AS build

# Créer un dossier de travail
WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code et construire l'app
COPY . .
RUN npm run build

# ---------- 2. Serveur Nginx pour production ----------
FROM nginx:alpine

# Copier le build React vers Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier un fichier de configuration Nginx personnalisé (optionnel)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
