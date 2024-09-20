# Etapa de build
FROM node:18 AS build

WORKDIR /app

# Copie o package.json e o package-lock.json
COPY frontend/package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY frontend/ .

# Build da aplicação
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Remover a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie os arquivos buildados para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar arquivo nginx.conf personalizado
COPY frontend/nginx.conf /etc/nginx/conf.d

# Exponha a porta 80 (não 8080 dentro do container, a porta externa será mapeada ao rodar)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
