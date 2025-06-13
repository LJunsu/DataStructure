import { BinarySearchTree } from "./BinarySearchTree.js";
import { Queue } from "./QueueAndLinkedList.js";
import { Stack } from "./StackAndLinkedList.js";

// Breadth Firts Search - 너비 우선 탐색
// 최단 경로에 적합
function bfs(tree) {
    const queue = new Queue(); // bfs는 큐(Queue)를 사용하여 가까운 노드부터 탐색
    queue.enqueue(tree.root); // 루트(root) 노드부터 시작하여 같은 레벨의 노드를 먼저 탐색

    while(queue.length > 0) { // 큐가 빌 때까지 반복 - 트리의 모든 노드 탐색
        const node = queue.dequeue(); // 큐에서 가장 앞에 있는 노드를 꺼냄(FIFO)
        console.log(node.value);

        if(node.left) { // 왼쪽 자식 노드가 있다면
            queue.enqueue(node.left); // 왼쪽 자식 노드를 큐에 추가
        }
        if(node.right) { // 오른쪽 자식 노드가 있다면
            queue.enqueue(node.right); // 오른쪽 자식 노드를 큐에 추가
        }
        // 이 과정을 반복하여 트리의 각 레벨을 순서대로 탐색
        // 루트 -> 같은 레벨 노드 순으로
    }
}

// Depth First Search - 깊이 우선 탐색
// 모든 경우 탐색 시 적합
function dfs(tree) {
    const stack = new Stack(); // dfs는 스택(Stack)을 사용하여 깊은 노드부터 탐색
    stack.push(tree.root); // 루트(root) 노드부터 시작하여 한쪽 끝까지 먼저 탐색
    
    while(stack.length > 0) { // 스택이 빌 때까지 반복 - 트리의 모든 노드 탐색
        const node = stack.pop(); // 스택의 가장 위에 있는 노드를 꺼냄(LIFO)
        console.log(node.value);
        
        // 오른쪽 자식 노드를 먼저 스택에 넣는 이유:
        // 스택 구조상 나중에 넣은 값이 먼저 나오므로, 왼쪽 -> 오른쪽 순서로 탐색하기 위해
        if(node.right) { // 오른쪽 자식 노드가 있다면
            stack.push(node.right); // 오른쪽 자식 노드를 스택에 추가
        }
        if(node.left) { // 왼쪽 자식 노드가 있다면
            stack.push(node.left); // 왼쪽 자식 노드를 스택에 추가
        }
        // 이 과정을 반복하여 트리를 한쪽 끝까지 깊이 우선으로 탐색
        // 루트 -> 한쪽 끝까지 -> 백트래킹
    }
}

// 노드를 처리하는 시점에 따라 다르게 동작하기 때문에
// 각 순회의 콘솔 출력 위치에 따라 탐색 순서와 처리 방식이 달라짐

// Pre Order Traversal - 전위 순회(루트 -> 왼쪽 -> 오른쪽)
function preOrder(node) {
    if(!node) return; // 노드가 null이면 종료 - 재귀 탈출 조건

    console.log(node.value); // 노드 처리
    preOrder(node.left); // 왼쪽 서브트리 순회
    preOrder(node.right); // 오른쪽 서브트리 순회
}

// In Order Traversal - 중위 순회(왼쪽 -> 루트 -> 오른쪽)
function inOrder(node) {
    if(!node) return; // 노드가 null이면 종료 - 재귀 탈출 조건

    inOrder(node.left); // 왼쪽 서브트리 순회
    console.log(node.value); // 루트 처리
    inOrder(node.right); // 오른쪽 서브트리 순회
}

// Post Order - 후위 순회(왼쪽 -> 오른쪽 -> 루트)
function postOrder(node) {
    if(!node) return; // 노드가 null이면 종료 - 재귀 탈출 조건

    postOrder(node.left); // 왼쪽 서브트리 순회
    postOrder(node.right); // 오른쪽 서브트리 순회
    console.log(node.value); // 루트 처리
}

const bst = new BinarySearchTree();

bst.insert(4);
bst.insert(2);
bst.insert(6);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(7);

// bfs(bst);
// dfs(bst);
// preOrder(bst.root);
// inOrder(bst.root);
// postOrder(bst.root);