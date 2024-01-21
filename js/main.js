"use strict";
let groupsNumber = 1;
const nombresArray = []; // Array para almacenar los nombres
const totalGrupos = document.getElementById("totalGrupos");
const mensajeAlerta = document.getElementById("mensajeAlerta");
const totalParticipantes = document.getElementById("totalParticipantes");
totalParticipantes.textContent = `Total participantes: ${nombresArray.length}`;
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
    const nombreValue = memberNameInput.value;
    if (nombre !== "") {
        // Array [(-1) = null o '', 0,1,2,3,4]
        const estaPresente = nombresArray.indexOf(nombre) === -1;
        if (estaPresente) {
            memberNameInput.value = "";
            nombresArray.push(nombre);
            mostrarNombres();
            totalParticipantes.textContent = `Total participantes: ${nombresArray.length}`;
        }
        else {
            mensajeAlerta.style.display = 'block';
            mensajeAlerta.textContent = "⚠️ El nombre ya existe.";
            setTimeout(() => {
                mensajeAlerta.style.display = 'none';
            }, 2000);
        }
    }
    if (nombre === "") {
        mensajeAlerta.style.display = 'block';
        mensajeAlerta.textContent = "⚠️ Por favor, ingrese por lo menos un nombre.";
        setTimeout(() => {
            mensajeAlerta.style.display = 'none';
        }, 2000);
    }
}
//function agregarGrupos() { }
function mostrarNombres() {
    const nombresContainer = document.getElementById('nombresContainer');
    nombresContainer.innerHTML = "";
    nombresArray.forEach((nombre, index) => {
        const nombreContainer = document.createElement('div');
        nombreContainer.className = 'nombre-container';
        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = nombre;
        const borrarNombreElement = document.createElement('span');
        borrarNombreElement.className = 'borrar-nombre';
        borrarNombreElement.textContent = ' ⛔';
        borrarNombreElement.addEventListener('click', () => eliminarNombre(index));
        nombreContainer.appendChild(nombreElement);
        nombreContainer.appendChild(borrarNombreElement);
        nombresContainer.appendChild(nombreContainer);
    });
}
function eliminarNombre(index) {
    nombresArray.splice(index, 1);
    mostrarNombres();
    totalParticipantes.textContent = `Total participantes: ${nombresArray.length}`;
}
function generarGrupos() {
    const groupsNumberGen = document.getElementById('groupsNumber');
    groupsNumberGen.innerHTML = '';
    console.log(nombresArray);
    // Verificar si hay suficientes personas para formar los grupos
    if (nombresArray.length < groupsNumber) {
        mensajeAlerta.style.display = 'block';
        mensajeAlerta.textContent = "⚠️ No hay suficientes participantes para formar la cantidad de grupos especificada.";
        setTimeout(() => {
            mensajeAlerta.style.display = 'none';
        }, 2000);
    }
    else {
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
}
function resetearDatos() {
    // Reiniciar el número de grupos a 1
    groupsNumber = 1;
    // Limpiar el array de nombres
    nombresArray.length = 0;
    // Limpiar los mensajes de alerta
    mensajeAlerta.style.display = 'none';
    mensajeAlerta.textContent = '';
    // Reiniciar el contenido de los contenedores
    const nombresContainer = document.getElementById('nombresContainer');
    nombresContainer.innerHTML = '';
    const container = document.getElementById('resultadoGrupos');
    if (container) {
        container.innerHTML = '';
    }
    // Reiniciar el valor del input de cantidad de grupos
    const groupsNumberInput = document.getElementById('groupsNumber');
    groupsNumberInput.value = '1';
    // Reiniciar el input de nombre
    const memberNameInput = document.getElementById('memberName');
    memberNameInput.value = '';
    // Reiniciar Total Grupos
    const totalGruposInput = document.getElementById('totalGrupos');
    totalGruposInput.innerHTML = '';
    totalParticipantes.textContent = `Total participantes: ${nombresArray.length}`;
}
