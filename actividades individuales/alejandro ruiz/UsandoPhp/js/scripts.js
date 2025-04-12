/*
? Esperar a que el DOM esté completamente cargado.
*/

document.addEventListener("DOMContentLoaded", function () {
  /*
  ? Selección de elementos del DOM
  */
  const form = document.getElementById("formularioUsuarios");
  const campoUsuario = document.getElementById("usuarioId");
  const campoNombre = document.getElementById("nombre");
  const campoEmail = document.getElementById("email");
  const cuerpoTablaUsuarios = document.querySelector("#tablaUsuarios tbody");

  /*
  ? Función para mostrar notificaciones
  */
  function mostrarNotificacion(mensaje, esError = false) {
    alert(mensaje);
  }

  /*
  ? Función para cargar usuarios desde el servidor
  */
  function CargarUsuarios() {
    fetch("php/leer.php")
      .then((response) => response.json())
      .then((data) => {
        cuerpoTablaUsuarios.innerHTML = "";
        data.forEach((user) => {
          let tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>
              <button onclick="editarUsuario(${user.id}, '${user.nombre}', '${user.email}')">Editar</button>
              <button onclick="if(confirm('¿Desea continuar con la eliminación?')) eliminarUsuario(${user.id})">Eliminar</button>
            </td>
          `;
          cuerpoTablaUsuarios.appendChild(tr);
        });
      })
      .catch((error) => {
        mostrarNotificacion("Error al cargar usuarios: " + error.message, true);
      });
  }

  /*
  ? Carga inicial de usuarios.
  */
  CargarUsuarios();

  /*
  ? Manejo del envío del formulario.
  */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const url =
      campoUsuario.value === "" ? "php/crear.php" : "php/actualizar.php";
    const datosFormulario = new FormData(form);

    if (campoUsuario.value !== "") {
      datosFormulario.append("id", campoUsuario.value);
    }

    fetch(url, {
      method: "POST",
      body: datosFormulario,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          mostrarNotificacion(result.message);
          form.reset();
          campoUsuario.value = "";
          CargarUsuarios();
        } else {
          mostrarNotificacion(result.error || "Error en la operación", true);
        }
      })
      .catch((error) => {
        mostrarNotificacion("Error en la operación: " + error.message, true);
      });
  });

  /*
  ? Función para editar un usuario.
  */
  window.editarUsuario = function (id, nombre, email) {
    // ? Asegurarse de que los campos existen antes de asignar valores
    if (campoUsuario && campoNombre && campoEmail) {
      campoUsuario.value = id;
      campoNombre.value = nombre;
      campoEmail.value = email;
    } else {
      mostrarNotificacion("Error al cargar el formulario", true);
    }
  };

  /*
  ? Función para eliminar un usuario.
  */
  window.eliminarUsuario = function (id) {
    let formData = new FormData();
    formData.append("id", id);

    fetch("php/borrar.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          mostrarNotificacion(result.message);
          CargarUsuarios();
        } else {
          mostrarNotificacion(result.error || "Error al eliminar", true);
        }
      })
      .catch((error) => {
        mostrarNotificacion("Error al eliminar: " + error.message, true);
      });
  };
});
