// configuracion de la app

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tareaRoutes from './routes/tarea.routes.js';
import personaRoutes from './routes/persona.routes.js';
import tagRoutes from './routes/tag.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import passport from './config/passport.js';
import adminRoutes from './routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// cors
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173'],
  credentials: true
}));

// json
app.use(express.json());

// forms
app.use(express.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());
// cookies y csrf
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// token csrf
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// openapi
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/api/tareas', tareaRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// home
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

// not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

export default app;
