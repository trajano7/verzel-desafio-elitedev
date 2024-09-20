FROM node:18

WORKDIR /app

# Copie o package.json e o package-lock.json
COPY backend/package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY backend/ .

# Exponha a porta usada pela aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]