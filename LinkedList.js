class Node {
    prev = null; // 현재 노드의 이전 노드
    next = null; // 현재 노드의 다음 노드

    constructor(value) {
        this.value = value; // 노드의 값
    }
}

class LinkedList {
    length = 0; // 연결 리스트의 길이
    head = null; // 연결 리스트의 첫 번째 노드 (순회 시 기준점)
    tail = null; // 연결 리스트의 마지막 노드

    add(value) { // 연결 리스트에 새 노드 추가
        if(this.head) { // 연결 리스트가 비어있지 않은 경우
            let lastNode = this.tail; // 연결 리스트의 마지막 노드
            let newNode = new Node(value); // 새 노드 생성

            lastNode.next = newNode; // 마지막 노드의 다음 노드를 새 노드로 설정
            newNode.prev = lastNode; // 새 노드의 이전 노드를 (기존의)마지막 노드로 설정
            this.tail = newNode; // 연결 리스트의 마지막 노드를 새 노드로 설정
        } else { // 연결 리스트가 비어있는 경우
            let newNode = new Node(value); // 새 노드 생성
            this.head = newNode; // 연결 리스트의 첫 번째 노드 설정
            this.tail = newNode; // 연결 리스트의 마지막 노드 설정
        }

        this.length++; // 연결 리스트의 길이 증가
        return this.length; // 현재 연결 리스트의 길이 반환
    }

    search(index) {
        return this.#search(index)?.value; // 연결 리스트의 특정 인덱스에 있는 노드 검색 후 값 반환
    }

    #search(index) { // 연결 리스트의 특정 인덱스에 있는 노드 검색
        let count = 0; // 몇 번째 노드인지 세기 위한 값
        let current = this.head; // 연결 리스트의 첫 노드 (순회 시 기준점)

        while(count < index) { // 인덱스에 도달할 때까지 순회
            current = current?.next; // 현재 노드의 다음 노드로 이동
            count++; // 카운트 증가
        }

        return current; // 현재 노드 반환
    }

    remove(index) {
        const current = this.#search(index); // 연결 리스트의 특정 인덱스의 노드 (삭제할 노드)
        if(!current) return; // 삭제할 노드가 존재하지 않는 경우 (undefined 반환)

        if(!current.prev) { // 삭제할 노드가 첫 번째 노드인 경우
            this.head = current.next; // 연결 리스트의 첫 번째 노드를 삭제할 노드의 다음 노드로 설정
            if(this.head) this.head.prev = null; // 새 첫 번째 노드의 이전 노드를 null로 설정
        } else if(!current.next) { // 삭제할 노드가 마지막 노드인 경우
            this.tail = current.prev; // 연결 리스트의 마지막 노드를 삭제할 노드의 이전 노드로 설정
            if(this.tail) this.tail.next = null; // 새 마지막 노드의 다음 노드를 null로 설정
        } else { // 삭제할 노드가 중간에 있는 경우
            current.prev.next = current.next; // 삭제할 노드의 이전 노드의 다음 노드를 삭제할 노드의 다음 노드로 설정
            current.next.prev = current.prev; // 삭제할 노드의 다음 노드의 이전 노드를 삭제할 노드의 이전 노드로 설정
        } 

        this.length--;
        return this.length;
    }
}

const linked = new LinkedList();