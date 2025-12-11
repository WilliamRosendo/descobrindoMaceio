# Etapa 1: build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent  # Mais rápido que npm install

COPY . .
RUN npm run build

# Etapa 2: produção
FROM nginx:alpine

# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração CRÍTICA para roteamento SPA
# Esta linha faz com que todas as rotas caiam no index.html
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]