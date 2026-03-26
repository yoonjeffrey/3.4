# API de Tareas - Práctica MVC con Express

API REST para la gestión de tareas, desarrollada con Node.js y Express siguiendo el patrón MVC.

## Estructura del Proyecto
- src/controllers/tarea.controller.js: Lógica de control.
- src/models/tarea.model.js: Modelo de datos y lógica.
- src/routes/tarea.routes.js: Definición de rutas.
- src/app.js: Configuración de la aplicación.
- server.js: Punto de entrada del servidor.

## Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor:
   ```bash
   npm run dev
   ```
3. URL base: http://localhost:3000

## Endpoints Principales

- GET /api/tareas: Listar tareas.
- GET /api/tareas/:id: Ver tarea por ID.
- GET /api/tareas/buscar?q=termino: Buscar por título.
- POST /api/tareas: Crear tarea.
- PUT /api/tareas/:id: Actualizar completa.
- PATCH /api/tareas/:id: Actualizar parcial.
- DELETE /api/tareas/:id: Eliminar tarea.

Nota: Use ?formato=text en los GET para respuesta en texto plano.
