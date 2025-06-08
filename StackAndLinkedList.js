import { LinkedList } from "./LinkedList.mjs";

class Stack { // LIFO
    list = new LinkedList(); // 연결 리스트를 사용하여 스택 구현

    push(value) {
        this.list.add(value); // 리스트의 마지막에 노드 추가
    }

    pop() {
        return this.list.remove(this.list.length - 1)[1]; // 리스트의 마지막 노드를 제거한 후 제거된 값을 반환
    }

    top() {
        return this.list.search(this.list.length - 1); // 리스트의 마지막 노드의 값을 반환
    }
}

const stack = new Stack();