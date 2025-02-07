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
docker-compose up --build  #  Sirve para construir las imagenes del archivo docker-compose.yml
# Build with name and tag
docker build -t clinica-api:1.0.0 . #El punto indica la ubicacion del directorio actual


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

¿Cuándo usar cada uno?
BadRequestException (400): Para solicitudes mal formadas o validaciones iniciales de entrada.
UnauthorizedException (401): Para problemas de autenticación (no has iniciado sesión o token inválido).
ForbiddenException (403): Para problemas de autorización (no tienes permisos).
NotFoundException (404): Recurso inexistente.
ConflictException (409): Conflictos (ej. registro duplicado).
GoneException (410): Recurso que existía pero ya no.
PayloadTooLargeException (413): Cuerpo de la petición excede límites.
UnsupportedMediaTypeException (415): Tipo de contenido no soportado.
UnprocessableEntityException (422): Fallos de validación más específicos que un 400.
InternalServerErrorException (500): Errores inesperados del lado servidor.
NotImplementedException (501): Funcionalidad no implementada.
ServiceUnavailableException (503): Servicio sobrecargado o en mantenimiento.
GatewayTimeoutException (504): Timeout en llamados a otros servicios.
ImATeapotException (418): Para probar o bromear; no se usa en entornos serios.
