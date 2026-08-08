# === Шаг 1: Сборка Vite (Frontend) ===
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Копируем зависимости фронтенда и устанавливаем их
COPY frontend/package*.json ./
RUN npm install

# Копируем код фронтенда и запускаем сборку Vite
COPY frontend/ ./
RUN npm run build

# === Шаг 2: Настройка сервера (Backend) ===
FROM node:20-alpine
WORKDIR /app/backend

# Копируем зависимости бэкенда и устанавливаем их
COPY backend/package*.json ./
RUN npm install

# Копируем остальной код бэкенда
COPY backend/ ./

# Копируем готовую статику из Vite (из папки dist фронтенда) в папку public бэкенда
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 80

# Команда запуска вашего Node.js сервера (замените index.js на server.js, если главный файл называется иначе)
CMD ["node", "index.js"]
