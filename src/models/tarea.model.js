let tareas = [
  { id: 1, titulo: 'Aprender Express', completada: false },
  { id: 2, titulo: 'Implementar MVC', completada: false },
  { id: 3, titulo: 'Probar API con Postman', completada: true }
];

let idActual = 4;

export const obtenerTodas = () => tareas;

export const obtenerPorId = (id) => tareas.find(tarea => tarea.id === id);

export const crear = (datosTarea) => {
  const nuevaTarea = {
    id: idActual++,
    titulo: datosTarea.titulo,
    completada: datosTarea.completada || false
  };
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

export const actualizarCompleta = (id, datosTarea) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  tareas[indice] = { id, titulo: datosTarea.titulo, completada: datosTarea.completada || false };
  return tareas[indice];
};

export const actualizarParcial = (id, datosParciales) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  tareas[indice] = { ...tareas[indice], ...datosParciales, id };
  return tareas[indice];
};

export const eliminar = (id) => {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) return null;
  const tareaEliminada = tareas[indice];
  tareas.splice(indice, 1);
  return tareaEliminada;
};

export const buscarPorTitulo = (termino) => {
    const terminoMinusculas = termino.toLowerCase();
    return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(terminoMinusculas));
};