import colors from "colors";
import { guardaDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";

//const { mostrarMenu, pausa } = require("./helpers/mensajes"); //para ver manualmente

//console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Defina la tarea a completar:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto(tareas);
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArray);
        if (id !== "0") {
          const ok = await confirmar("¿Estás seguro?");
          if (ok) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }
    guardaDB(tareas.listadoArray);
    await pausa();
  } while (opt !== "0");
};

main();
