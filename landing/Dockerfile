FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY docusaurus.config.ts ./ 
COPY sidebars.ts ./  

COPY ./src ./src  
COPY ./static ./static 
COPY ./docs ./docs  

COPY package.json package-lock.json ./

RUN npm ci

# Expose the port
EXPOSE 3000

CMD ["npm", "run", "serve", "--", "--build", "--port", "3000", "--host", "0.0.0.0"]
