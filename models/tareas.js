import colors from "colors";
import Tarea from "./tarea.js";

class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  
  borrarTarea( id ='' ) {

    if(this._listado[id]) {
      delete this._listado[id];
    }

  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, idx) => {
      const i = `${idx + 1}`.green;
      // if(tarea.completadoEn===null) {
      //     console.log(i + '. ' + tarea.desc + ' :: ' + 'Pendiente'.red);
      // } else {
      //     console.log(i + '. ' + tarea.desc + ' :: ' + 'Completada'.green);
      // }

      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${i}. ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArray.forEach((tarea) => {
      // if(tarea.completadoEn===null) {
      //     console.log(i + '. ' + tarea.desc + ' :: ' + 'Pendiente'.red);
      // } else {
      //     console.log(i + '. ' + tarea.desc + ' :: ' + 'Completada'.green);
      // }

      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completadoEn.green}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas( ids = []) {

    ids.forEach( id  => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach( tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });

  }

}

export default Tareas;
