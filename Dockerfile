FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção com Caddy
FROM caddy:2-alpine

# Copiar a configuração do Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Copiar os arquivos de build da aplicação
COPY --from=build /app/dist /app/dist

# Expor porta
EXPOSE 80

# Iniciar o Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
