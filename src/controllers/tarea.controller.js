import * as tareaModel from '../models/tarea.model.js';

export const obtenerTodas = (req, res) => {
    try {
        const tareas = tareaModel.obtenerTodas();
        const formato = req.query.formato;

        if (formato === 'text') {
            let texto = 'Lista de Tareas:\n\n';
            tareas.forEach(t => {
                const estado = t.completada ? 'Tarea completada: true' : 'Tarea completada: false';
                texto += `${t.id} - ${t.titulo}. ${estado} \n`;
            });
            return res.send(texto); 
        }

        res.json({ success: true, data: tareas, count: tareas.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las tareas', error: error.message });
    }
};

export const obtenerPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido. Debe ser un número' });
    
    const tarea = tareaModel.obtenerPorId(id);
    if (!tarea) return res.status(404).json({ success: false, message: `Tarea con ID ${id} no encontrada` });
    
    res.json({ success: true, data: tarea });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener la tarea', error: error.message });
  }
};

export const crear = (req, res) => {
  try {
    const { titulo, completada } = req.body;
    if (!titulo) return res.status(400).json({ success: false, message: 'El campo "titulo" es requerido' });
    
    const nuevaTarea = tareaModel.crear({ titulo, completada });
    res.status(201).json({ success: true, message: 'Tarea creada exitosamente', data: nuevaTarea });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear la tarea', error: error.message });
  }
};

export const actualizarCompleta = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;
    
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido. Debe ser un número' });
    if (!titulo) return res.status(400).json({ success: false, message: 'El campo "titulo" es requerido' });
    
    const tareaActualizada = tareaModel.actualizarCompleta(id, { titulo, completada });
    if (!tareaActualizada) return res.status(404).json({ success: false, message: `Tarea con ID ${id} no encontrada` });
    
    res.json({ success: true, message: 'Tarea actualizada completamente', data: tareaActualizada });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar la tarea', error: error.message });
  }
};

export const actualizarParcial = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;
    
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido. Debe ser un número' });
    if (Object.keys(datosParciales).length === 0) return res.status(400).json({ success: false, message: 'Debe enviar al menos un campo para actualizar' });
    
    const tareaActualizada = tareaModel.actualizarParcial(id, datosParciales);
    if (!tareaActualizada) return res.status(404).json({ success: false, message: `Tarea con ID ${id} no encontrada` });
    
    res.json({ success: true, message: 'Tarea actualizada parcialmente', data: tareaActualizada });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar la tarea', error: error.message });
  }
};

export const eliminar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido. Debe ser un número' });
    
    const tareaEliminada = tareaModel.eliminar(id);
    if (!tareaEliminada) return res.status(404).json({ success: false, message: `Tarea con ID ${id} no encontrada` });
    
    res.json({ success: true, message: 'Tarea eliminada exitosamente', data: tareaEliminada });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar la tarea', error: error.message });
  }
};

export const buscarTareas = (req, res) => {
    try {
        const termino = req.query.q;
        if (!termino) return res.status(400).json({ success: false, message: 'El parametro de busqueda "q" es requerido' });

        const resultados = tareaModel.buscarPorTitulo(termino);
        res.json({ success: true, data: resultados, count: resultados.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al buscar tareas', error: error.message });
    }
};