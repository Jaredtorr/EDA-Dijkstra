import LinkedList from "./LinkedList.mjs";

export default class Graph {
    
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    dijkstra(startVertex) {
        const inf = Infinity;
        const numVertices = this.numVertices();
        let D = new Array(numVertices).fill(inf);
        let l_P = new Set([...this.#map.values()]);
        let L = new Set();
    
        const start = this.#map.get(startVertex);
        if (start === undefined) {
            return null;
        }
    
        D[start] = 0;
    
        while (l_P.size > 0) {
            let u = null;
            let minDistance = inf;
            for (let vertex of l_P) {
                if (D[vertex] < minDistance) {
                    minDistance = D[vertex];
                    u = vertex;
                }
            }
            if (u === null) {
                break;
            }
    
            L.add(u);
            l_P.delete(u);
    
            const neighborsLinkedList = this.#matrizAdyacencia[u];
            let current = neighborsLinkedList.head;
            while (current) {
                const neighbor = this.#map.get(current.value.node);
                const weight = current.value.weight;
                if (l_P.has(neighbor) && D[u] + weight < D[neighbor]) {
                    D[neighbor] = D[u] + weight;
                }
                current = current.next;
            }
        }
    
        const distances = {};
        for (let [vertex, index] of this.#map) {
            distances[vertex] = D[index];
        }
    
        return distances;
    }
    
    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const stack = [];
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop();
            if (!visited[currentVertex]) { 
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex); 
                    }
                    current = current.next; 
                }
            }
        }
    }

    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const queue = [];
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    getVertices() {
        return this.#map.keys();
    }

    numVertices() {
        return this.#map.size;
    }

    numEdges() {
        let numEdges = 0;
        for (let linkedList of this.#matrizAdyacencia) {
            numEdges += linkedList.size();
        }
        return numEdges;
    }
}
