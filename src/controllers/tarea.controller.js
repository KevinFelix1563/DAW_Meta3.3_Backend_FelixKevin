/**
 * Controlador de Tareas
 * Maneja las peticiones HTTP y responde con JSON
 */

const tareaModel = require('../models/tarea.model');

// GET /api/tareas
const obtenerTodas = (req, res) => {
    try {
        const tareas = tareaModel.obtenerTodas();
        const formato = req.query.formato; // Capturamos el parámetro 'formato' de la URL

        // Si el usuario pide texto plano
        if (formato === 'text') {
            let texto = 'Lista de Tareas:\n\n';
            tareas.forEach(t => {
                const estado = t.completada ? 'Tarea completada: true' : 'Tarea completada: false';
                texto += `${t.id} - ${t.titulo}. ${estado} \n`;
            });
            // Usamos res.send() en lugar de res.json() para devolver texto
            return res.send(texto); 
        }

        // Por defecto, devolvemos JSON
        res.json({
            success: true,
            data: tareas,
            count: tareas.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las tareas',
            error: error.message
        });
    }
};

// GET /api/tareas/:id - Obtener una tarea por ID
const obtenerPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }
    
    const tarea = tareaModel.obtenerPorId(id);
    
    if (!tarea) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      data: tarea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
};

// POST /api/tareas - Crear una nueva tarea
const crear = (req, res) => {
  try {
    const { titulo, completada } = req.body;
    
    // Validar datos requeridos
    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }
    
    const nuevaTarea = tareaModel.crear({ titulo, completada });
    
    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: nuevaTarea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
};

// PUT /api/tareas/:id - Actualizar tarea completamente
const actualizarCompleta = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }
    
    // Validar datos requeridos
    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }
    
    const tareaActualizada = tareaModel.actualizarCompleta(id, { titulo, completada });
    
    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea actualizada completamente',
      data: tareaActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

// PATCH /api/tareas/:id - Actualizar tarea parcialmente
const actualizarParcial = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }
    
    // Si no hay datos para actualizar
    if (Object.keys(datosParciales).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe enviar al menos un campo para actualizar'
      });
    }
    
    const tareaActualizada = tareaModel.actualizarParcial(id, datosParciales);
    
    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea actualizada parcialmente',
      data: tareaActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

// DELETE /api/tareas/:id - Eliminar una tarea
const eliminar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }
    
    const tareaEliminada = tareaModel.eliminar(id);
    
    if (!tareaEliminada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }
    
    res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: tareaEliminada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
};

// GET /api/tareas/buscar?q=termino
const buscarTareas = (req, res) => {
    try {
        const termino = req.query.q; // Capturamos el parametro 'q' de la URL
        
        if (!termino) {
            return res.status(400).json({
                success: false,
                message: 'El parametro de busqueda "q" es requerido'
            });
        }

        const resultados = tareaModel.buscarPorTitulo(termino);
        
        res.json({
            success: true,
            data: resultados,
            count: resultados.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar tareas',
            error: error.message
        });
    }
};

// Exportar todos los métodos del controlador
module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar,
  buscarTareas
};
