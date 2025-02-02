# Documentación para el proyecto de Prisma 2.0

Paso 1: Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

Paso 2: Instalar las dependencias del proyecto

```bash
npm install
```

Paso 3: Ejecutar las docker-compose para levantar la base de datos

```bash
docker-compose up -d
docker-compose down
```

Paso 4: Ejecutar Nest JS

```bash
npm run start:dev
```

Paso 5: Crear la base de datos y las tablas

```bash
npx prisma migrate dev --name init
```

# Prisma 2.0

1. **Create Migration**

```bash
npx prisma migrate dev --name init
```

2. **Generate Prisma Client**

```bash
npx prisma generate
```

3. **Verify Database Creation**
   Interface to verify database creation

```bash
npx prisma studio
```

4. **Optional - Format Schema**
   Format schema file

```bash
npx prisma format
```

Para eliminar de forma rapida y segura la base de datos y las migraciones, ejecutar el siguiente comando:

```bash
RD /S /Q
```

Para ver la ayuda de los comandos de nest, ejecutar el siguiente comando:

```
 nest g -h
 --no-spec
```

** Prisma Studio **

```bash
http://localhost:5555
```

