// Stack + Queue
// push, pop, shift, unshift
// JS에서는 배열과 매우 유사
class Deque {
    arr = [];

    push(value) {
        return this.arr.push(value);
    }

    pop() {
        return this.arr.pop();
    }

    shift() {
        return this.arr.shift();
    }

    unshift() {
        return this.arr.unshift();
    }

    peek() {
        return this.arr.at(0);
    }

    get length() {
        return this.arr.length;
    }
}

const deque = new Deque();