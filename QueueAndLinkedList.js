import { LinkedList } from "./LinkedList.js";

export class Queue { // FIFO
    list = new LinkedList(); // 연결 리스트를 사용하여 큐 구현

    enqueue(value) {
        return this.list.add(value); // 리스트의 마지막에 노드 추가
    }

    dequeue() {
        return this.list.remove(0)[1]; // 리스트의 첫번째 노드를 제거한 후 제거된 값을 반환
    }

    peek() {
        return this.list.search(0); // 리스트의 첫번째 노드의 값을 반환
    }

    get length() {
        return this.list.length
    }
}

const queue = new Queue();