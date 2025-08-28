
# PROJECT 10: FULL STACK JAVASCRIPT
## _thePower - Desarrollo Full Stack_

## Descripción
Este proyecto es una API REST para la gestión de eventos y asistentes. Permite a los usuarios registrarse, iniciar sesión, crear eventos, confirmar asistencia y gestionar su perfil, incluyendo la subida de avatares y carteles de eventos. El objetivo es practicar buenas prácticas de arquitectura, seguridad y experiencia de usuario en el backend.

## Requisitos del Proyecto
- Backend con Express
- Conexión a MongoDB Atlas usando Mongoose
- Modelo de usuario (nombre, email, contraseña hasheada, avatar)
- Modelo de evento (título, fecha, ubicación, descripción, cartel, asistentes)
- Middleware de autenticación con JWT
- Middleware de subida de ficheros (multer)
- Controladores para CRUD de eventos y usuarios
- Confirmación de asistencia a eventos
- Manejo de errores centralizado
- Rutas protegidas para usuarios autenticados
- README con endpoints y explicación

## Tech

Stack utilizado en este proyecto:
- Node.js
- Express
- Mongoose
- MongoDB
- DotEnv
- Nodemon
- Bcrypt
- JsonWebToken
- Multer
- CORS

## Instalación

Este proyecto requiere [Node.js](https://nodejs.org/) v20.10+ para funcionar.

Instala las dependencias y ejecuta el servidor en modo desarrollo:

```sh
cd [nombre de la carpeta del proyecto]
npm install
npm run dev
```


## Endpoints

### AUTH

| Método | Ruta | Descripción | Body/Params |
|--------|------|-------------|-------------|
| POST | `/api/auth/register` | Registro de usuario + login automático | FormData: name, email, password, avatar (opcional) |
| POST | `/api/auth/login` | Login y obtención de token | { email, password } |

### USERS

| Método | Ruta | Descripción | Body/Params |
|--------|------|-------------|-------------|
| GET | `/api/users` | Listar usuarios (id y nombre) | - |
| GET | `/api/users/me` | Obtener perfil propio | Header: Authorization: Bearer <token> |
| PUT | `/api/users/me` | Subir/cambiar avatar de perfil | FormData: avatar (solo imagen) |
| GET | `/api/users/email/:email` | Obtener nombre y avatar por email | :email (email del usuario) |

**Notas sobre usuarios:**
- El nombre y el email no se pueden modificar desde el perfil, solo la imagen de perfil.
- El backend elimina la imagen anterior de Cloudinary al subir una nueva.

### EVENTS

| Método | Ruta | Descripción | Body/Params |
|--------|------|-------------|-------------|
| GET | `/api/events` | Listar todos los eventos | - |
| GET | `/api/events/me/attending` | Eventos donde el usuario está apuntado (token) | Header: Authorization: Bearer <token> |
| GET | `/api/events/me/created` | Eventos creados por el usuario (token) | Header: Authorization: Bearer <token> |
| GET | `/api/events/:id` | Obtener detalles de un evento | :id (ID del evento) |
| POST | `/api/events` | Crear evento (autenticado) | FormData o JSON: title, date, location, description, poster (opcional), attendeeEmails (opcional, emails separados por coma) |
| POST | `/api/events/:id/confirm` | Confirmar asistencia (autenticado) | :id (ID del evento) |
| POST | `/api/events/:id/reject` | Rechazar asistencia (autenticado) | :id (ID del evento) |
| GET | `/api/events/:id/attendees` | Listar asistentes, confirmados y rechazados de evento | :id (ID del evento) |
| DELETE | `/api/events/:id` | Eliminar evento (solo creador, autenticado) | :id (ID del evento) |

**Notas sobre eventos:**
- Al eliminar un evento, si tenía imagen en Cloudinary, también se elimina de la nube.
- Los arrays `attendees`, `confirmed` y `rejected` permiten mostrar recuentos y listados diferenciados.

---

## Usuarios de prueba creados

Puedes usar estos usuarios para probar el login y las funcionalidades del sistema:

| Nombre | Email | Contraseña |
|--------|-------------------|-------------|
| alex   | alex@alex.com     | alex123     |
| marta  | marta@marta.com   | marta123    |
| test   | test@test.com     | test123     |
| jefe   | jefe@jefe.com     | jefe123     |

---

---
---
---
