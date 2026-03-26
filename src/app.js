import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import dotenv from 'dotenv'; // Importar dotenv

import tareaRoutes from './routes/tarea.routes.js';
import authRoutes from './routes/auth.routes.js'; // Importar las rutas de autenticacion
import { verificarToken } from './middleware/auth.js'; // Importar middleware de autenticacion

dotenv.config(); // Cargar las variables de nuestro archivo .env

const app = express();

// Para comunicacion entre server y cliente se usa CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lectura de cookies
app.use(cookieParser());



// Rutas Públicas (Cualquiera puede intentar hacer login)
app.use('/api/auth', authRoutes);

// Rutas Protegidas (El middleware verificarToken se ejecuta antes de llegar a las rutas)
app.use('/api/tareas', verificarToken, tareaRoutes);


// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Tareas - Práctica MVC con Express (Secured)',
    version: '1.0.0'
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

export default app;