// 최소 힙 - Min Heap
// 완전 이진 트리 구조
// 부모 노드가 항상 자식보다 작다

class MinHeap {
    arr = [];

    #reheapUp(index) {
        if(index > 0) { // root 노드가 아니라면 - index가 0이면 root 노드
            const parentIndex = Math.floor((index - 1) / 2); // 부모 인덱스 계산

            if(this.arr[index] < this.arr[parentIndex]) { // 부모가 자식보다 크면 교환
                // 두 노드 값 교환
                const temp = this.arr[index];
                this.arr[index] = this.arr[parentIndex];
                this.arr[parentIndex] = temp;

                this.#reheapUp(parentIndex); // 부모 인덱스로 이동하여 다시 비교
            }
        }
    }

    #reheapDown(index) {
        const leftIndex = index * 2 + 1; // 왼쪽 자식 인덱스 계산

        // 완전 이진 트리는 왼쪽부터 순차적으로 값을 저장하기 때문에 자식 노드가 있다면 왼쪽이 우선 채워짐
        if(leftIndex < this.arr.length) {
            const rightIndex = index * 2 + 2; // 오른쪽 자식 인덱스 계산
            // 두 자식 중 더 작은 값을 가진 인덱스 선택
            const smaller = this.arr[leftIndex] < this.arr[rightIndex] ? leftIndex : rightIndex;

            if(this.arr[index] > this.arr[smaller]) { // 부모가 더 크면 교환
                const temp = this.arr[index];
                this.arr[index] = this.arr[smaller];
                this.arr[smaller] = temp;

                this.#reheapDown(smaller); // 교환한 자식 인덱스로 이동하여 다시 비교
            }
        }
    }

    #heapify(index) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        // 존재하지 않는 경우 undefined -> 0 처리
        const smaller = (this.arr[leftIndex] || 0) < (this.arr[rightIndex] || 0) ? leftIndex : rightIndex;

        if(this.arr[index] > this.arr[smaller]) {
            const temp = this.arr[index];
            this.arr[index] = this.arr[smaller];
            this.arr[smaller] = temp;

            this.#heapify(smaller);
        }
    }

    // 힙에 값 추가 시 배열 끝에 삽입 후 힙 속성 유지
    insert(value) {
        const index = this.arr.length; // 삽입할 위치 - 배열의 마지막 index
        this.arr[index] = value; // 배열의 마지막에 값 추가
        this.#reheapUp(index); // 위로 올라가며 최소 힙 구조 유지
    }

    // 최소 힙에서 최소값(root)를 제거하고 힙 구조 유지
    remove() {
        if(this.arr.length === 0) return false; // 빈 힙이면 false 반환

        if(this.arr.length === 1) return this.arr.pop(); // 힙에 요소가 하나면 그대로 반환

        const root = this.arr[0]; // 최소값(root)
        this.arr[0] = this.arr.pop(); // 마지막 요소를 root로 이동
        this.#reheapDown(0); // 아래로 내려가며 힙 구조 유지

        return root; // 기존 root 반환
    }

    // 작은 값부터 꺼내서 정렬된 배열 반환
    sort() {
        const copy = [...this.arr]; // 원본 배열 복사 (정렬 후 원본 유지 목적)
        const sortedArray = [];

        while(this.arr.length > 0) {
            sortedArray.push(this.remove()); // remove 시 최소값(root)를 제거 - 가장 작은 값부터 차례대로 저장
        }

        this.arr = copy; // 원본 복구
        return sortedArray; // 오름차순 정렬 결과 반환
    }

    // 힙 내부에서 특정 값(value)의 index를 반환
    search(value) {
        for(let i = 0; i < this.arr.length; i++) {
            if(this.arr[i] === value) return i;
        }

        return null;
    }

    // 힙 내 특정 값(value)을 찾아 newValue로 변경 후 최소 힙 구조 복구
    update(value, newValue) {
        const index = this.search(value); // 수정할 값의 위치 검색
        if(index === null) return false; // 값이 존재하지 않으면 false 반환
        
        this.arr[index] = newValue; // 값 변경

        // 마지막 노드(자식이 있는 부모 노드)부터 root까지 heapify를 수행하여 힙 구조 복구
        for(let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
            // Math.floor(this.arr.length / 2 - 1) 계산은 
            // leaf가 아닌 노드에 대해서만 뒤에서부터 root 방향으로 구조를 맞춰가는 작업
            // 만약 arr.length가 7이라면 7/2-1=2 0~2는 leaf가 아닌 부모 3~6는 leaf
            this.#heapify(i);
        }
    }

    // 힙 내 특정 값(value)을 삭제 후 최소 힙 구조 복구
    removeValue(value) {
        const index = this.search(value); // 삭제할 값의 위치 검색
        if(index === null) return false; // 값이 존재하지 않으면 false 반환

        this.arr.splice(index, 1); // 해당 인덱스의 값 제거

        // 마지막 노드(자식이 있는 부모 노드)부터 root까지 heapify를 수행하여 힙 구조 복구
        for(let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
            // Math.floor(this.arr.length / 2 - 1) 계산은 
            // leaf가 아닌 노드에 대해서만 뒤에서부터 root 방향으로 구조를 맞춰가는 작업
            // 만약 arr.length가 7이라면 7/2-1=2 0~2는 leaf가 아닌 부모 3~6는 leaf
            this.#heapify(i);
        }
    }
}

const heap = new MinHeap();