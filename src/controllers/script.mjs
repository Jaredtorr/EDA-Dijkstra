import Graph from "../models/Graph.mjs";

const graph = new Graph();

const btnAgregarLugar = document.getElementById("agregarLugar");
const btnAgregarConexion = document.getElementById("agregarConexion");
const btnRecorridoProfundidad = document.getElementById("verProfundidad");
const btnRecorridoAnchura = document.getElementById("verAnchura");
const btnEncontrarRuta = document.getElementById("encontrarRuta");
const tbodyProfundidad = document.getElementById("tbodyProfundidad");
const tbodyAnchura = document.getElementById("tbodyAnchura");
const tbodyDijkstra = document.getElementById("tbodyDijkstra");

function mostrarAlerta(icon, title, message) {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#007bff',
        background: '#f8f9fa',
        color: '#333',
        iconColor: '#007bff',
        customClass: {
            title: 'alert-title',
            content: 'alert-content'
        }
    });
}

btnAgregarLugar.addEventListener("click", () => {
    const nombreLugar = document.getElementById("nombreLugar").value.trim();
    
    if (nombreLugar !== "") {
        if (graph.addVertex(nombreLugar)) {
            mostrarAlerta('success', 'Registro Exitoso', `Se registró el lugar ${nombreLugar}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo registrar el lugar');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar el nombre del lugar');
    }
});

btnAgregarConexion.addEventListener("click", () => {
    const lugarInicio = document.getElementById("lugarInicio").value.trim();
    const lugarDestino = document.getElementById("lugarDestino").value.trim();
    const distancia = parseInt(document.getElementById("distanciaLugar").value);

    if (lugarInicio !== "" && lugarDestino !== "" && !isNaN(distancia)) {
        if (graph.addEdge(lugarInicio, lugarDestino, distancia)) {
            mostrarAlerta('success', 'Conexión Agregada', 'La conexión se agregó correctamente');
        } else {
            mostrarAlerta('error', 'Error', 'No se pudo agregar la conexión');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar ambos lugares y la distancia para la conexión');
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    tbodyProfundidad.innerHTML = '';

    const vertices = [...graph.getVertices()];
    if (vertices.length === 0) {
        mostrarAlerta('error', 'Error', 'No hay lugares en el grafo');
        return;
    }

    graph.dfs(vertices[0], (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyProfundidad.appendChild(row);
    });
});

btnRecorridoAnchura.addEventListener("click", () => {
    tbodyAnchura.innerHTML = '';

    const vertices = [...graph.getVertices()];
    if (vertices.length === 0) {
        mostrarAlerta('error', 'Error', 'No hay lugares en el grafo');
        return;
    }

    graph.bfs(vertices[0], (vertex) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = vertex;
        row.appendChild(cell);
        tbodyAnchura.appendChild(row);
    });
});

btnEncontrarRuta.addEventListener("click", () => {
    tbodyDijkstra.innerHTML = '';

    const inicioDijkstra = document.getElementById("inicioDijkstra").value.trim();

    if (inicioDijkstra !== "") {
        const distances = graph.dijkstra(inicioDijkstra);
        if (distances) {
            for (let [node, distance] of Object.entries(distances)) {
                const row = document.createElement('tr');
                const cellNode = document.createElement('td');
                const cellDistance = document.createElement('td');
                cellNode.textContent = node;
                cellDistance.textContent = distance === Infinity ? 'Infinito' : distance;
                row.appendChild(cellNode);
                row.appendChild(cellDistance);
                tbodyDijkstra.appendChild(row);
            }

            mostrarAlerta('success', 'Rutas Más Cortas', `Se calcularon las distancias más cortas desde ${inicioDijkstra}`);
        } else {
            mostrarAlerta('error', 'Error', 'No se encontró una ruta desde el lugar especificado');
        }
    } else {
        mostrarAlerta('error', 'Error', 'Debe ingresar el lugar de inicio para encontrar las rutas más cortas');
    }
});
