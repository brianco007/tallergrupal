"use strict";
let groupsNumber = 1;
const nombresArray = []; // Array para almacenar los nombres
const totalGrupos = document.getElementById("totalGrupos");
const mensajeAlerta = document.getElementById("mensajeAlerta");
document.getElementById('groupsNumber').addEventListener('change', function (event) {
    groupsNumber = parseInt(event.target.value, 10);
});
document.getElementById('memberName').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        agregarNombre();
    }
});
function agregarNombre() {
    const memberNameInput = document.getElementById('memberName');
    const nombre = memberNameInput.value.trim();
    if (nombre !== "") {
        memberNameInput.value = "";
        nombresArray.push(nombre);
        mostrarNombres();
        console.log(nombresArray.length);
    }
    if (nombre === "") {
        mensajeAlerta.style.display = 'block';
        mensajeAlerta.textContent = "⚠️ Por favor, ingrese por lo menos un nombre.";
        setTimeout(() => {
            mensajeAlerta.style.display = 'none';
        }, 2000);
    }
}
function mostrarNombres() {
    const nombresContainer = document.getElementById('nombresContainer');
    nombresContainer.innerHTML = "";
    nombresArray.forEach((nombre, index) => {
        const nombreContainer = document.createElement('div');
        nombreContainer.className = 'nombre-container';
        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = nombre.toUpperCase()[0] + nombre.substring(1).toLowerCase();
        const borrarNombreElement = document.createElement('span');
        borrarNombreElement.className = 'borrar-nombre';
        borrarNombreElement.textContent = ', ';
        borrarNombreElement.addEventListener('click', () => eliminarNombre(index));
        nombreContainer.appendChild(nombreElement);
        nombreContainer.appendChild(borrarNombreElement);
        nombresContainer.appendChild(nombreContainer);
    });
}
function eliminarNombre(index) {
    nombresArray.splice(index, 1);
    mostrarNombres();
}
function generarGrupos() {
    console.log(nombresArray);
    // Verificar si hay suficientes personas para formar los grupos
    if (nombresArray.length < groupsNumber) {
        mensajeAlerta.style.display = 'block';
        mensajeAlerta.textContent = "⚠️ No hay suficientes participantes para formar la cantidad de grupos especificada.";
        setTimeout(() => {
            mensajeAlerta.style.display = 'none';
        }, 2000);
    }
    //   resetear input de cantidad de grupos al hacer click PENDIENTE
    // Copiar el array de nombres para no modificar el original
    const nombresCopiados = [...nombresArray];
    // Inicializar los grupos como arrays vacíos
    const grupos = [];
    for (let i = 0; i < groupsNumber; i++) {
        grupos.push([]);
    }
    // Distribuir aleatoriamente los nombres en los grupos
    while (nombresCopiados.length > 0) {
        for (let i = 0; i < groupsNumber; i++) {
            // Obtener un nombre aleatorio
            const nombreAleatorio = nombresCopiados.splice(Math.floor(Math.random() * nombresCopiados.length), 1)[0];
            // Asignar el nombre al grupo actual
            grupos[i].push(nombreAleatorio);
        }
    }
    console.log(grupos);
    const container = document.getElementById("resultadoGrupos");
    if (container) {
        container.innerHTML = ""; // Limpiar contenido previo
        for (let i = 0; i < groupsNumber; i++) {
            const grupoDiv = document.createElement("div");
            grupoDiv.className = "gruposSeparado";
            grupoDiv.innerHTML = `<p><span class="tituloGrupo">GRUPO ${i + 1}</span>: ${grupos[i].join(', ')}</p>`;
            container.appendChild(grupoDiv);
        }
        //const cantidadGruposDiv = document.createElement("div");
        //cantidadGruposDiv.className="totalGrupos"
        totalGrupos.innerHTML = `<p>Cantidad de grupos: ${groupsNumber}</p>`;
        //container.appendChild(cantidadGruposDiv);
    }
    return grupos;
}
