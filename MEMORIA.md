# Memoria Técnica - Proyecto Cheshire

## Introducción

El presente documento describe el desarrollo técnico de Cheshire, una aplicación web diseñada para la gestión integral de un club de golf. El proyecto consiste en una API REST desarrollada en Node.js con Express.js, backed por MongoDB como base de datos, que proporciona funcionalidades para la administración de usuarios, campos, reservas y resultados de partidas.

El nombre del proyecto hace referencia al gato de Cheshire, personaje icónico de "Alicia en el país de las maravillas". Esta elección responde a la filosofía del proyecto: una herramienta presente cuando se necesita y invisible cuando no, facilitando cada acción del usuario sin intermediarios innecesarios.

## Arquitectura del Sistema

### Patrón de Diseño

La aplicación implementa el patrón MVC (Model-View-Controller) con una capa adicional de servicios. Esta separación de responsabilidades permite mantener un código organizado, donde cada capa tiene funciones claramente definidas. Los modelos establecen la estructura de datos, los controladores gestionan la lógica de los endpoints, los servicios encapsulan la lógica de negocio, y las rutas definen la interfaz pública de la API.

### Estructura de Directorios

El código fuente se organiza de la siguiente manera:

- **app.js**: Punto de entrada de la aplicación, configura Express y define las rutas principales.
- **db/database.js**: Módulo de conexión a MongoDB utilizando Mongoose.
- **Models/**: Esquemas de Mongoose que definen la estructura de cada colección en la base de datos.
- **Controllers/**: Funciones que manejan las peticiones HTTP y retornan las respuestas.
- **Services/**: Capa intermedia que encapsula la lógica de negocio.
- **Routes/**: Definición de endpoints de la API.
- **Middleware/**: Funciones intermedias, destacando el sistema de autenticación JWT.

## Modelo de Datos

### Usuario

El modelo de Usuario representa a los miembros del club de golf. Cada documento contiene el nombre completo, correo electrónico único, contraseña hasheada, rol (administrador o jugador) y handicap del usuario. La contraseña se procesa con bcrypt antes de almacenarse, garantizando que nunca se guarda en texto plano.

### Campo

El modelo de Campo define las instalaciones de golf disponibles. Incluye el nombre, ubicación geográfica, número de hoyos (9 o 18), par del campo y precios para socios e invitados.

### Reserva

El modelo de Reserva gestiona las reservas de tee times. Almacena la referencia al usuario que reserva, el campo seleccionado, fecha, hora, número de hoyos y estado de la reserva (confirmada, pendiente o cancelada). El sistema verifica la disponibilidad del horario antes de confirmar una nueva reserva.

### Resultado

El modelo de Resultado registra las puntuaciones de las partidas jugadas. Contiene la referencia al usuario, campo, fecha de la partida y puntuación obtenida. Este modelo permite a los jugadores consultar su historial y seguimiento del handicap.

## Autenticación y Seguridad

El sistema de autenticación utiliza JSON Web Tokens (JWT). Cuando un usuario inicia sesión correctamente, el servidor genera un token que incluye el identificador del usuario y su rol. Este token debe enviarse en el header de Authorization de cada petición protegida.

Las contraseñas se almacenan utilizando bcrypt con 10 rondas de salting, proporcionando protección contra ataques de fuerza bruta y rainbow tables. El middleware de autenticación verifica la validez del token en cada request protegido, y el middleware de autorización controla el acceso a rutas específicas según el rol del usuario.

## Endpoints de la API

### Usuarios

- **POST /api/usuarios/registro**: Crea un nuevo usuario en el sistema.
- **POST /api/usuarios/login**: Autentica a un usuario y retorna un token JWT.
- **GET /api/usuarios**: Lista todos los usuarios. Restringido a administradores.
- **GET /api/usuarios/perfil/:id**: Obtiene el perfil de un usuario específico.
- **DELETE /api/usuarios/:id**: Elimina un usuario. Restringido a administradores.

### Campos

- **GET /api/campos**: Lista todos los campos disponibles.
- **POST /api/campos/nuevo**: Crea un nuevo campo. Restringido a administradores.
- **PUT /api/campos/:id**: Actualiza la información de un campo.
- **DELETE /api/campos/:id**: Elimina un campo.

### Reservas

- **POST /api/reservas**: Crea una nueva reserva.
- **GET /api/reservas**: Lista todas las reservas. Restringido a administradores.
- **GET /api/reservas/usuario/:id**: Lista las reservas de un usuario específico.
- **DELETE /api/reservas/:id**: Cancela una reserva existente.

### Resultados

- **POST /api/resultados**: Registra el resultado de una partida.
- **GET /api/resultados**: Lista todos los resultados. Restringido a administradores.
- **GET /api/resultados/usuario/:id**: Lista el historial de resultados de un usuario.

## Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| Node.js | Entorno de ejecución JavaScript |
| Express.js | Framework web para API REST |
| MongoDB | Base de datos documental |
| Mongoose | ODM para modelado de datos |
| bcryptjs | Hash de contraseñas |
| jsonwebtoken | Generación y verificación de JWT |
| Docker | Contenedores para despliegue |

## Despliegue

La aplicación está configurada para ejecutarse mediante Docker Compose, que orchestration un contenedor para la API Node.js y otro para MongoDB. Esta configuración facilita el despliegue y garantiza consistencia entre entornos.

## Conclusiones

El proyecto Cheshire cumple con los objetivos establecidos, proporcionando una solución funcional para la gestión de un club de golf. La arquitectura MVC, el sistema de autenticación robusto y la separación de responsabilidades facilitan el mantenimiento y futuras extensiones del sistema.

---

**:** Mayo 2026