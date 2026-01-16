# NestJS Onboarding

**NestJS Onboarding** es una API backend desarrollada en **NestJS** que simula el flujo de onboarding de clientes para un banco digital. Su objetivo es recibir, validar y almacenar solicitudes de apertura de cuenta de forma segura y estructurada.

---

## Características principales

### 🔐 Autenticación (Auth)

- Permite iniciar sesión mediante el endpoint `POST /auth/login`.
- Usa credenciales ficticias para efectos de la prueba.
- Genera un **JWT con duración de 5 minutos**.
- El token se utiliza para proteger endpoints sensibles del sistema.
- Implementa autenticación basada en **Bearer Token (JWT)**.

### 📦 Gestión de productos (Products)

- Permite consultar los productos disponibles del banco.
- Endpoints disponibles:
  - `GET /products`: retorna el listado completo de productos.
  - `GET /products/:id`: retorna el detalle de un producto específico.
- Los productos se almacenan en **PostgreSQL**.
- Implementa **caché con Redis** para:
  - Listado de productos.
  - Consulta individual por ID.
- El caché tiene una duración de **60 segundos**, mejorando el rendimiento y reduciendo la carga a la base de datos.
- Maneja correctamente errores cuando un producto no existe.

### 🧾 Onboarding de clientes

- Permite crear solicitudes de onboarding mediante `POST /onboarding`.
- El endpoint está protegido por **JWT**.
- Recibe y valida información del cliente:
  - Nombre
  - Documento
  - Email
  - Monto inicial
- Las validaciones se realizan con **class-validator**.
- Las solicitudes se almacenan en PostgreSQL con estado inicial `REQUESTED`.
- Retorna un identificador único del onboarding y su estado.

### ❤️ Health Check

- Endpoint `GET /health`.
- Permite verificar que el servicio esté activo.
- Ideal para monitoreo, balanceadores de carga o validaciones de infraestructura.
- Respuesta simple y sin autenticación.

### 🧱 Manejo estándar de respuestas y errores

- Todas las respuestas exitosas siguen una **estructura uniforme**, incluyendo:
  - Datos de la respuesta
  - Código de estado
  - Timestamp
  - Ruta del endpoint
- Todas las excepciones (HTTP y no HTTP) son capturadas por un **Exception Filter global**, retornando errores con un formato consistente.
- Facilita el consumo de la API por parte del frontend y otros servicios.

### 📚 Documentación con Swagger

- La API está completamente documentada con **Swagger**.
- Incluye:
  - Descripción de endpoints
  - DTOs de entrada y salida
  - Autenticación JWT
- Disponible en la ruta `/api-docs`.

### 🐳 Infraestructura dockerizada

- La aplicación se ejecuta completamente en contenedores Docker.
- Incluye los siguientes servicios:
  - Backend NestJS
  - PostgreSQL
  - pgAdmin
  - Redis
- Todo el entorno se levanta con un solo comando usando **Docker Compose**.

## 🛠️ Construido con

- NestJS
- Typescript
- Node.js
- PostgreSQL
- TypeORM
- Redis
- JWT (JSON Web Tokens)
- Passport.js
- class-validato
- class-transformer
- Swagger (OpenAPI)
- Docker & Docker Compose

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) instalados y en ejecución

## 📥 Obtener el proyecto

Clona el repositorio:

```bash
#Clona el repositorio
git clone https://github.com/jeisonrojasm/nestjs-onboarding.git
cd nestjs-onboarding
```

## 🚀 Ejecutar

### 1. **Archivo `.env` requerido**

Normalmente, el archivo `.env` **no debería incluirse** en un repositorio público, ya que puede contener valores de configuración sensibles.  
Sin embargo, con fines de demostración y evaluación —y dado que este no es un proyecto de producción— el archivo `.env` está incluido en el repositorio para que cualquiera pueda ejecutar el proyecto sin configuraciones adicionales.

El archivo `.env` ya se encuentra ubicado en la raíz del proyecto.

### 2. Levantar el entorno de desarrollo con Docker

Basta con ejecutar el siguiente comando desde la raíz del proyecto para construir la imagen y levantar el contenedor del backend:

```bash
docker-compose up --build
```

Una vez finalizado el proceso, el backend quedará disponible en:

```arduino
http://localhost:3000
```

## 🔐 Autenticación – Endpoint /auth/login

El endpoint **POST** `/auth/login` utiliza **credenciales ficticias**, definidas así por los requerimientos del reto técnico.

### Credenciales requeridas (obligatorias)

Para obtener un token JWT **debe enviarse exactamente** el siguiente body:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Cualquier combinación diferente devolverá un error de autenticación.

### Comportamiento del servicio

- No existe persistencia de usuarios en base de datos.
- El usuario admin es hardcodeado en el servicio de autenticación.
- Si las credenciales son válidas, el servicio retorna un JWT que debe usarse en los endpoints protegidos.
- Si las credenciales son inválidas, se retorna un error 401 Unauthorized.

### Nota técnica

Este comportamiento es **intencional** y responde a los requerimientos del reto técnico, el cual solicitaba el uso de un usuario y contraseña ficticios.

> 🔧 **TODO futuro**: implementar búsqueda real de usuarios en base de datos y manejo de credenciales seguras.

## 📚 Documentación con Apidoc

Esta API cuenta con documentación interactiva generada automáticamente con Apidoc gracias a la integración con `apidoc`.

### ¿Qué puedes hacer desde Apidoc?

- Ver todos los endpoints disponibles (GET, POST, PATCH, etc.)
- Ver ejemplos de solicitudes y respuestas.

### 🔗 Acceso a la documentación

Una vez el backend esté corriendo, puedes acceder a la documentación por medio de:

```bash
http://localhost:3000/api-docs
```

## 🗄️ Conexión a pgAdmin

La base de datos PostgreSQL y la herramienta de administración pgAdmin también están dockerizadas, por lo que no es necesario instalarlas localmente.

Para acceder a pgAdmin y ver la base de datos:

1. Abre tu navegador y visita la siguiente URL:

   ```bash
   http://localhost:8080
   ```

2. Inicia sesión utilizando las credenciales definidas en tu archivo `.env`:

   ```bash
   PGADMIN_DEFAULT_EMAIL
   PGADMIN_DEFAULT_PASSWORD
   ```

3. Una vez dentro del panel de pgAdmin:
   - Haz clic derecho en la sección **Servers** (barra lateral izquierda).
   - Selecciona **Register** > **Server**.

4. En el formulario de configuración:

   🧾 **Pestaña General**
   - **Name**: Ingresa un nombre descriptivo, por ejemplo: `nestjs-onboarding`.

   🔌 **Pestaña Connection**
   - **Host name/address**: Definido en la variable `DATABASE_HOST` del archivo `.env`
   - **Port**: Definido en la variable `DATABASE_PORT` del archivo `.env`
   - **Username**: Definido en la variable `DATABASE_USER` del archivo `.env`
   - **Password**: Definido en la variable `DATABASE_PASSWORD` del archivo `.env`
   - Opcional: Marca la casilla *Save password* para no tener que ingresarla cada vez.
  
5. Haz clic en **Save** para guardar la configuración y conectarte.

   Una vez creada la conexión, puedes explorar las bases de datos, ver las tablas, ejecutar consultas y gestionar los datos desde la interfaz de pgAdmin.

## 🌱 Seed de Productos

La aplicación cuenta con un **seed automático de productos** que se ejecuta al iniciar el backend.

### **¿Cómo funciona?**

- El seed está implementado dentro del módulo `Products`.
- Se ejecuta automáticamente durante el ciclo de vida de NestJS (`OnModuleInit`).
- Al iniciar la aplicación, se valida si la tabla `products` está vacía.
- Si no existen registros, se insertan **10 productos de ejemplo** automáticamente.
- Si la tabla ya contiene datos, el seed **no se vuelve a ejecutar**, evitando duplicados.

### **¿Cuándo se ejecuta?**

- Al iniciar la aplicación NestJS.
- Durante el `docker-compose up`.

### **¿Para qué sirve?**

- Facilita el desarrollo y las pruebas.
- Garantiza que la API tenga datos disponibles desde el primer arranque.
- Evita la carga manual inicial de información.

> ⚠️ El seed está pensado para entornos de desarrollo y pruebas.  
> En producción se recomienda deshabilitarlo o controlarlo mediante variables de entorno.

## 👨‍💻 Autor

Desarrollado por **Jeison Rojas Mora** - *Fullstack Developer*

- [https://github.com/jeisonrojasm](https://github.com/jeisonrojasm)
- [https://www.linkedin.com/in/jeison-rojas-mora/](https://www.linkedin.com/in/jeison-rojas-mora/)
