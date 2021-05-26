FROM node:16-buster-slim

WORKDIR /app
COPY . .
RUN chmod +x setup.sh
RUN ./setup.sh