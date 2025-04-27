#!/bin/sh
# Ejecutar migraciones de la base de datos con Prisma
npx prisma migrate deploy

# Iniciar la aplicación en modo producción
node dist/main.js
