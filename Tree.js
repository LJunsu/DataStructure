class Node {
    children = [];

    constructor(value) {
        this.value = value;
    }

    push(value) {
        this.children.push(new Node(value));
    }
}

class Tree {
    constructor(value) {
        this.root = new Node(value);
    }
}

const tree = new Tree(50);

tree.root.push(25);
tree.root.push(75);
tree.root.children[0].push(20);
tree.root.children[0].push(30);

console.log(tree);
console.log(tree.root);