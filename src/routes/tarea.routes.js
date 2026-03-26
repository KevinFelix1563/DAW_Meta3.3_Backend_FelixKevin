import express from 'express';
import * as tareaController from '../controllers/tarea.controller.js';

const router = express.Router();

router.get('/', tareaController.obtenerTodas);
router.get('/buscar', tareaController.buscarTareas);
router.get('/:id', tareaController.obtenerPorId);
router.post('/', tareaController.crear);
router.put('/:id', tareaController.actualizarCompleta);
router.patch('/:id', tareaController.actualizarParcial);
router.delete('/:id', tareaController.eliminar);

export default router;