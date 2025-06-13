// 그래프 - Graph
// 서로 간의 연결관계를 가지고 있는 자료구조
// Vertex와 in-degree, out-degree가 있는 방향, 무방향 그래프
// in-degree - 
class Graph {
    vertices = []; // Vertex의 이름을 담은 배열
    matrix = []; // 인접 행렬 형태로 Arc의 연결 관계를 저장하는 2차원 배열

    insertVertex(name) {
        this.vertices.push(new Vertex(name)); // Vertex 생성
        // Vertex를 push할 때마다 해당 Vertex의 matrix를 관리하는 배열을 생성
        // insertArc에서 2차원 배열로 값을 추가하기에 Vertex의 2차원 배열을 만들어줘야 함
        this.matrix.push([]);
    }

    // 해당 Vertex의 인덱스 반환
    #searchVertex(name) {
        for(let i = 0; i < this.vertices.length; i++) {
            if(this.vertices[i].name === name) {
                return i;
            }
        }

        return null;
    }

    // from은 시작 Vertex
    // to는 도착 Vertex
    // form-to를 통해 방향 그래프 구현
    insertArc(from, to, value, capacity) {
        const fromV = this.#searchVertex(from); // 시작 Vertex 인덱스
        const toV = this.#searchVertex(to); // 도착 Vertex 인덱스
        if(fromV === null || toV === null) {
            throw "찾는 Vertex가 없습니다."
        }

        // Vertex의 Arc 연결 관계를 배열을 통해 저장
        this.matrix[fromV][toV] = new Arc(value, capacity);
    }
}

// tree와 비교했을 때 node의 역할
// 데이터나 객체를 표현하는 그래프의 기본 단위
// 직접적으로 값을 갖지 않고, 식별을 위한 이름을 가짐
class Vertex {
    constructor(name) {
        this.name = name;
    }
}

// tree와 비교했을 때 edge의 역할
// 두 Vertex 간의 연결 관계를 표현하는 선
// value는 Arc을 통해 현재 흐르고 있는 값
// capacity는 Arc을 통해 흐를 수 있는 최대량(필요시 사용)
class Arc {
    constructor(value, capacity) {
        this.value = value;
        this.capacity= capacity;
    }
}

const g = new Graph();

g.insertVertex("a");
g.insertVertex("b");
g.insertVertex("c");
g.insertArc("a", "b", 3);
g.insertArc("a", "c", 2);
g.insertArc("c", "a", 4);
g.insertArc("b", "c", 2);
