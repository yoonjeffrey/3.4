/**
 * Configuración de la aplicación Express
 */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const tareaRoutes = require('./routes/tarea.routes');
const personaRoutes = require('./routes/persona.routes');
const tagRoutes = require('./routes/tag.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios (opcional)
app.use(express.urlencoded({ extended: true }));

// Middleware de logging (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Documentación OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/tareas', tareaRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Tareas - Práctica MVC con Express',
    version: '1.0.0',
    endpoints: {
      getAll: 'GET /api/tareas',
      getById: 'GET /api/tareas/:id',
      search: 'GET /api/tareas/buscar?q=termino',
      create: 'POST /api/tareas',
      updateFull: 'PUT /api/tareas/:id',
      updatePartial: 'PATCH /api/tareas/:id',
      delete: 'DELETE /api/tareas/:id',
      extra: 'Use ?formato=text para obtener respuesta en texto plano'
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

module.exports = app;
