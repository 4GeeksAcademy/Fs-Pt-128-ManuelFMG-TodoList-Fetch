import React, { useEffect, useState } from "react";
//INICIADO CON PATRICIA
const Home = () => {
  const API_URL = "https://playground.4geeks.com/todo";
  const USER = "Manuel";

  //Guarda lo que el usuario escribe en el input y el estado del input comienza vacío ("").
  const [tarea, setTarea] = useState("");

  //En este array se almacenan cada tarea ingresada en el input (efecto memoria y lo muestra)
  //Su estado inicial parte vacío ([]) hasta que no se introduce la primera tarea.
  const [listaTarea, setlistaTarea] = useState([]);

  //Usuario

  /*Necesitamos crear una funcion asincrona para crear el usuario => Metodo POST*/
  /*Necesitamos crear una funcion asincrona para obtenerlo => Metodo GET*/

  //Tareas

  /*Necesitamos crear una funcion asincrona para crear la tarea => Metodo POST */
  /*Necesitamos crear una funcion asincrona para eliminar la tarea => Metodo DELETE*/
  //------------------------------------------

  //USUARIO:
  //Creamos al usuario si no existe
  const postUser = async () => {
    const response = await fetch(`${API_URL}/users/${USER}`, {
      method: "POST",
    });
  };

  //Obtemos tareas del usuario
  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${USER}`);
    console.log(response);
    if (!response.ok) {
      postUser();
    }
    const data = await response.json();
    setlistaTarea(data.todos);
    console.log(listaTarea);
  };

  //TAREAS:
  //Creamos una tarea
  const postCreateTarea = async (texto) => {
    const task = {
      label: texto,
      is_done: false,
    };

    const response = await fetch(`${API_URL}/todos/${USER}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    getUser(); // refresca la lista
  };

  //Eliminamos una tarea
  const deleteTarea = async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    getUser(); // refresca la lista
  };

  // Borrar TODAS las tareas
  const clearAllTasks = async () => {
    await Promise.all(
      listaTarea.map((task) =>
        fetch(`${API_URL}/todos/${task.id}`, {
          method: "DELETE",
        })
      )
    );

    setlistaTarea([]);
  };

  //Carga Inicial
  useEffect(() => {
    getUser();
  }, []);

  /*Este return nos devuelve lo que actualmente vemos en la pagina:
  - Un titulo h1 (Mi primera Lista de Tareas Con Fetch).
  - Un input de tipo texto sin datos aun pero con texto predefinido
    "Añade una tarea y pulsa Enter" utilizando placeholder.
  - Una lista que por defecto aparece vacía hasta que le introduzcas una tarea.
  - Un contador que muestra la cantidad de tareas que hay en ese mismo instante:
     (si añadimos una tarea suma una unidad y si eliminamos una tarea resta una unidad).*/

  //Render
  return (
    //div padre, y todo lo que hay en su interior son sus hijos.
    <div>
      {/*Este es mi titulo*/}
      <h1 className="container d-flex justify-content-center mt-5">
        <strong>Mi Primera Lista de Tareas Con Fetch</strong>{" "}
        <i className="icono fa-solid fa-list mt-1"></i>
      </h1>

      <div className="container d-flex justify-content-center mt-5">
        <div className="notebook shadow">
          {/*Este es mi input*/}
          <input
            type="text"
            className="form-control p-3 border-0"
            placeholder="Añade una tarea y pulsa Enter"
            value={tarea}
            /*Esto me almacena el texto escrito en el input al pulsar la tecla Enter*/
            onChange={(e) => setTarea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tarea.trim() !== "") {
                postCreateTarea(tarea);
                setTarea("");
              }
            }}
          />

          {/*Esto me crea un listado con cada nueva tarea al macenada*/}
          <ul className=" list-group list-group-flush">
            {/*.map recorre el array listaTarea, por cada listaTarea crea una lista "por orden de llegada", eso de debe al index*/}
            {listaTarea.map((item) => (
              <li
                key={item.id}
                className="tarea list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.label}</span>

                {/*Esto es lo que hace la función de botón que permite al hacer click
				eliminar el iten (tarea) de esa línea  */}
                <button className="borrar" onClick={() => deleteTarea(item.id)}>
                  <p className="m-0">
                    <i className="fa-regular fa-rectangle-xmark"></i>
                  </p>
                </button>
              </li>
            ))}
          </ul>

          {/* Esto hace la función de contador recorre el array hasta el final (.length) y me registra el numero de elementos (tareas) que hay almacenado en el array*/}
          <div className="note-footer d-flex justify-content-between align-items-center">
            <span>
              {listaTarea.length} Tarea{listaTarea.length !== 1 && "s"}{" "}
              {/* Si la cantidad es diferente a 1 añade una "s" al final de la palabra tarea*/}
            </span>

            {listaTarea.length > 0 && (
              <button className="btn btn-sm btn-danger" onClick={clearAllTasks}>
                <p className="m-0">Limpiar todo</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
