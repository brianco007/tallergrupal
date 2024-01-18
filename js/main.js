"use strict";
let groupsNumber = 1;
const nombresArray = []; // Array para almacenar los nombres
document.getElementById('groupsNumber').addEventListener('change', function (event) {
    groupsNumber = parseInt(event.target.value, 10);
});
<<<<<<< HEAD
$createBtn.addEventListener('click', () => {
    const participantsPerGroup = membersArray.length / parseInt($groupsNumber.value);
    let groupToRender = "";
    for (let i = 0; i < Math.floor(parseInt($groupsNumber.value)); i++) {
        let ulElement = document.createElement('ul');
        ulElement.textContent = `Group #${i + 1}`;
        for (let i = 0; i < participantsPerGroup; i++) {
            const randomNumber = Math.floor(Math.random() * membersArray.length);
            let liElement = document.createElement('li');
            liElement.textContent = membersArray[randomNumber];
            ulElement.appendChild(liElement);
            membersArray.splice(randomNumber, 1);
        }
        $groups.appendChild(ulElement);
=======
document.getElementById('memberName').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        agregarNombre();
>>>>>>> 170359f3683687def91b0860855c4961b2a68e4e
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
}
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
        borrarNombreElement.textContent = 'x';
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
        throw new Error("No hay suficientes personas para formar la cantidad de grupos especificada");
    }
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
            grupoDiv.innerHTML = `<p>Grupo ${i + 1}: ${grupos[i].join(', ')}</p>`;
            container.appendChild(grupoDiv);
        }
        const cantidadGruposDiv = document.createElement("div");
        cantidadGruposDiv.innerHTML = `<p>Cantidad de grupos: ${groupsNumber}</p>`;
        container.appendChild(cantidadGruposDiv);
    }
    return grupos;
}
