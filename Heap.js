class Heap {
    constructor(heapType) {
        this.arr = [];
        this.heapType = heapType; // true -> MaxHeap, false -> MinHeap
    }

    compare(a, b) {
        if(this.heapType) return a > b;
        return a < b;
    }

    converter() {
        this.heapType = !this.heapType;

        for(let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
            this.#heapify(i);
        }
    }

    #reheapUp(index) { 
        if(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if(this.compare(this.arr[index], this.arr[parentIndex])) {
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
            const comparison = this.compare(this.arr[leftIndex], this.arr[rightIndex]) ? leftIndex : rightIndex;
    
            if(this.compare(this.arr[comparison], this.arr[index])) {
                const temp = this.arr[index];
                this.arr[index] = this.arr[comparison];
                this.arr[comparison] = temp;
    
                this.#reheapDown(comparison);
            }
        }
    }

    #heapify(index) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;

        const comparison = this.compare((this.arr[leftIndex] || 0), (this.arr[rightIndex] || 0)) ? leftIndex : rightIndex;

        if(this.compare(this.arr[comparison], this.arr[index])) {
            const temp = this.arr[index];
            this.arr[index] = this.arr[comparison];
            this.arr[comparison] = temp;

            this.#heapify(comparison);
        }
    }

    insert(value) {
        const index = this.arr.length;
        this.arr[index] = value;
        this.#reheapUp(index);
    }

    remove() {
        if(this.arr.length === 0) return false;

        if(this.arr.length === 1) return this.arr.pop();

        const root = this.arr[0];
        this.arr[0] = this.arr.pop();
        this.#reheapDown(0);

        return root; // 기존 root 반환
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
            if(this.arr[i] === value) return i;
        }

        return null;
    }

    update(value, newValue) {
        const index = this.search(value);
        if(index === null) return false;

        this.arr[index] = newValue;

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


const maxHeap = new Heap(true); // true -> MaxHeap, false -> MinHeap
maxHeap.insert(8);
maxHeap.insert(19);
maxHeap.insert(23);
maxHeap.insert(32);
maxHeap.insert(45);
maxHeap.insert(56);
maxHeap.insert(78);
console.log(maxHeap.arr);
maxHeap.converter();
console.log(maxHeap.arr);
maxHeap.converter();
console.log(maxHeap.arr);