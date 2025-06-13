// 우선순위 큐 - Priority Queue
// 이진 힙을 조금 변형하여 구현
// 큐를 기반으로 하나씩 쌓이는 것은 동일하지만, 
// 순차적으로 쌓인 큐를 무시하고 우선순위를 기반으로 앞 쪽에 넣어 먼저 처리
class PriorityQueue {
    arr = [];

    #reheapUp(index) { 
        if(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            // 우선순위(priority)를 기반으로 힙 구조를 관리
            if(this.arr[index].priority > this.arr[parentIndex].priority) {
                const temp = this.arr[index];
                this.arr[index] = this.arr[parentIndex];
                this.arr[parentIndex] = temp;

                this.#reheapUp(parentIndex);
            }
        }
    }

    #reheapDown(index) {
        const leftIndex = index * 2 + 1;

        if(leftIndex < this.arr.length) {
            const rightIndex = index * 2 + 2;
            const bigger = this.arr[leftIndex].priority > this.arr[rightIndex]?.priority ? leftIndex : rightIndex;
    
            // 우선순위(priority)를 기반으로 힙 구조를 관리
            if(this.arr[index]?.priority < this.arr[bigger]?.priority) {
                const temp = this.arr[index];
                this.arr[index] = this.arr[bigger];
                this.arr[bigger] = temp;
    
                this.#reheapDown(bigger);
            }
        }
    }

    #heapify(index) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        const bigger = (this.arr[leftIndex]?.priority || 0) > (this.arr[rightIndex]?.priority || 0) ? leftIndex : rightIndex;

        // 우선순위(priority)를 기반으로 힙 구조를 관리
        if(this.arr[index]?.priority < this.arr[bigger]?.priority) {
            const temp = this.arr[index];
            this.arr[index] = this.arr[bigger];
            this.arr[bigger] = temp;

            this.#heapify(bigger);
        }
    }

    insert(priority, value) { // 기존 힙의 insert에서 우선순위를 함께 insert
        const index = this.arr.length;
        this.arr[index] = { // 객체의 형태로 우선순위와 값을 관리
            priority, value
        };
        this.#reheapUp(index);
    }

    remove() {
        if(this.arr.length === 0) return false;

        if(this.arr.length === 1) return this.arr.pop();

        const root = this.arr[0];
        this.arr[0] = this.arr.pop();
        this.#reheapDown(0);

        return root;
    }

    sort() {
        const copy = [...this.arr];
        const sortedArray = [];
        
        while(this.arr.length > 0) {
            sortedArray.push(this.remove());
        }

        this.arr = copy;
        return sortedArray;
    }

    search(value) {
        for(let i = 0; i < this.arr.length; i++) {
            if(this.arr[i].value === value) return i;
        }

        return null;
    }

    update(value, newValue) {
        const index = this.search(value);
        if(index === null) return false;

        this.arr[index].value = newValue;

        for(let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
            this.#heapify(i);
        }
    }

    removeValue(value) {
        const index = this.search(value);
        if(index === null) return false;

        this.arr.splice(index, 1);

        for(let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
            this.#heapify(i);
        }
    }
}

const pq = new PriorityQueue();
pq.insert(3, "one");
pq.insert(7, "two");
pq.insert(2, "three");
pq.insert(8, "four");
pq.insert(5, "five");
pq.insert(6, "six");
pq.insert(9, "king");
console.log(pq.remove());
console.log(pq.remove());
console.log(pq.remove());
console.log(pq.remove());
console.log(pq.remove());
console.log(pq.remove());
console.log(pq.remove());