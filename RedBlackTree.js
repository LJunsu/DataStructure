import { bfs } from "./traversal.js";

class Node {
    left = null;
    right = null;
    parent = null;

    // 기존 이진 탐색 트리의 구조에서 color를 추가한 형태
    constructor(value, color = "red") {
        this.value = value;
        this.color = color
    }

    getUncle() {        
        // 부모의 부모 노드(할아버지)로 접근한 후 두 자식 노드 중 부모가 아닌 노드 = 삼촌
        if(this.parent?.parent.left === this.parent) {
            return this.parent?.parent?.right;
        } else if(this.parent?.parent?.right === this.parent) {
            return this.parent?.parent?.left;
        }
        // root 노드는 null을 반환
    }
}

// 레드블랙트리
// 이진 탐색 트리 + Balanced Tree
/*
    규칙
    1. Node는 Red 혹은 Black color를 가짐
    2. Root Node는 반드시 Black
    3. 새로 추가되는 Node는 Red
    4. Red는 연속되면 안됨 (Red의 자식이 Red - XXX) (Black는 연속 허용)
    5. Red Node의 자식 Node는 Black
    6. Root부터 leaf까지 Black의 갯수가 모두 같아야 함.
*/
class RedBlackTree { 
    root = null;
    #length = 0;

    #checkDoubleRed(node) {
        // 추가한 노드(newNode)를 기준으로 recolor, restructure 실행 조건 
        if(node.color === "red" && node.parent.color === "red") {
            const uncle = node.getUncle();

            // 삼촌 노드가 red라면 recolor
            if(uncle && uncle.color === "red") {
                this.#recolor(node);
            }
            // 삼촌 노드가 black라면 restructure
            else if(uncle && uncle.color === "black") {
                this.#restructure(node);
            }
            // 삼촌 노드가 없다면 restructure
            else if(!uncle) {
                this.#restructure(node);
            }
        }
    }

    // 삼촌 노드가 Red면 Recolor 수행
    /*
                    B(할아버지)
            R(부모)         R(삼촌)
                R(나)
                
                부모와 삼촌을 Red에서 Black로, 
                할아버지를 Black에서 Red로
                            ↓
                
                    R(할아버지)
            B(부모)         B(삼촌)
                R(나)
                
                단, Root는 어떤 상황에도 Black를 유지
                            ↓

                    B(할아버지)
            B(부모)         B(삼촌)
                R(나)
    */
    #recolor(node) {
        if(node.parent) {
            node.parent.color = "black";
        }
        if(node.getUncle()) {
            node.getUncle().color = "black";
        }
        if(node.parent?.parent) {
            node.parent.parent.color = "red";
            
            if(node.parent.parent === this.root) {
                node.parent.parent.color = "black";
            }
        }

        this.#checkDoubleRed(node.parent?.parent);
    }

    // 삼촌 노드가 Black 혹은 삼촌 노드가 없다면, Restructure 수행
    #restructure(node) {
        let middle;

        const grandgrandpa = node.parent.parent.parent; // nullable
        const grandpa = node.parent.parent;
        const parent = node.parent;

        if(node.value > node.parent.parent.value) { // 내가 할아버지보다 클 때
            if(node.value > node.parent.value) {
                middle = node.parent;
            }
            else {
                middle = node;
            }

            if(middle === node) { // 가운데(중간 값)가 자식일 때
                node.left = grandpa;
                grandpa.parent = node;
                grandpa.right = null;

                node.right = parent;
                parent.parent = node;
                parent.left = null;
            }
            else { // 가운데(중간 값)가 부모일 때
                grandpa.right = parent.left;
                if(grandpa.right) {
                    grandpa.right.parent = grandpa;
                }
                grandpa.right = null;

                parent.left = grandpa;
                parent.left.parent = parent;
            }

            if(grandgrandpa.left === grandpa) {
                grandgrandpa.left = middle;
                middle.parent = grandgrandpa;
            }
            else {
                grandgrandpa.right = middle;
                middle.parent = grandgrandpa;
            }
        }
        else { // 내가 할아버지보다 작을 때
            if(node.value < node.parent.value) {
                middle = node.parent;
            }
            else {
                middle = node;
            }

            if(middle === node) { // 가운데(중간 값)가 자식일 때
                node.right = grandpa;
                grandpa.parent = node;
                grandpa.left = null;

                node.left = parent;
                parent.parent = node;
                parent.right = null;
            }
            else { // 가운데(중간 값)가 부모일 때
                grandpa.left = parent.right;
                if(grandpa.left) {
                    grandpa.left.parent = grandpa;
                }
                grandpa.left = null;

                parent.right = grandpa;
                parent.right.parent = parent;
            }

            if(grandgrandpa.left === grandpa) {
                grandgrandpa.left = middle;
                middle.parent = grandgrandpa;
            }
            else {
                grandgrandpa.right = middle;
                middle.parent = grandgrandpa;
            }
        }

        middle.color = "black";
        if(middle.left) {
            middle.left.color = "red";
        }
        if(middle.right) {
            middle.right.color = "red";
        }
    }

    insert(value) {
        if(!this.root) {
            this.root = new Node(value, "black"); // root는 반드시 black
            this.#length++;
        } else {
            const newNode = this.#insert(this.root, value);

            this.#checkDoubleRed(newNode);
        }
    }

    #insert(node, value) {
        if(node.value === value) {
            throw new Error("이미 존재하는 Node입니다.")
        } else if(node.value > value) {
            // 추가한 노드를 반환하여 insert 함수에서 사용(Balanced 유지 목적)
            if(node.left) {
                return this.#insert(node.left, value);
            } else {
                this.#length++;
                
                // 새로 추가되는 node는 red
                const newNode = new Node(value, "red");
                newNode.parent = node; // 상위 노드 저장(recolor, restructure 검증 시 사용)
                node.left = newNode;
                return newNode;
            }
        } else {
            // 추가한 노드를 반환하여 insert 함수에서 사용(Balanced 유지 목적)
            if(node.right) {
                return this.#insert(node.right, value);
            } else {
                this.#length++;
                
                // 새로 추가되는 node는 red
                const newNode = new Node(value, "red");
                newNode.parent = node; // 상위 노드 저장(recolor, restructure 검증 시 사용)
                node.right = newNode;
                return newNode;
            }
        }
    }

    search(value) {
        if(!this.root) return null;

        if(this.root.value === value) {
            return this.root;
        }

        return this.#search(this.root, value);
    }

    #search(node, value) {
        if(node.value > value) {
            if(!node.left) return;

            if(node.left.value === value) {
                return node.left;
            }

            return this.#search(node.left, value);
        } else {
            if(!node.right) return;

            if(node.right.value === value) {
                return node.right;
            }

            return this.#search(node.right, value);
        }
    }

    remove(value) {        
        this.root = this.#remove(this.root, value);

        return this.#length;
    }

    #remove(node, value) {
        if(!node) {
            return null;
        }

        if(node.value === value) {
            if(!node.left && !node.right) {
                this.#length--;
                return null;
            } 
            else if(!node.left) {
                this.#length--;
                return node.right;
            } 
            else if(!node.right) {
                this.#length--;
                return node.left;
            } 
            else {
                let exchange = node.left;
                
                while(exchange.right) {
                    exchange = exchange.right;
                }

                const temp = node.value;
                node.value = exchange.value;
                exchange.value = temp;

                node.left = this.#remove(node.left, temp);
                return node;
            }
        } else {
            if(node.value > value) {
                node.left = this.#remove(node.left, value);
                return node;
            } else {
                node.right = this.#remove(node.right, value);
                return node;
            }
        }
    }

    get length() {
        return this.#length;
    }
}

const rbt = new RedBlackTree();

rbt.insert(8);
rbt.insert(7);
rbt.insert(9);
rbt.insert(3);
rbt.insert(6);
rbt.insert(4);
rbt.insert(5);
rbt.insert(12);

bfs(rbt);