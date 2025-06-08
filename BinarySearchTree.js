class Node {
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }
}

// 노드당 최대 두 개의 자식 노드
// 기준 노드보다 작으면 왼쪽, 크면 오른쪽에 자식 노드를 생성
// 중복을 허용하지 않거나, 주로 오른쪽에 삽입
class BinarySearchTree { 
    root = null;
    length = 0; // 숙제 - insert, remove 시 length 제어

    insert(value) {
        if(!this.root) { // root 노드가 없다면
            this.root = new Node(value); // root 노드 추가
        } else { // root 노드가 있다면
            this.#insert(this.root, value); // 자식 노드로 insert 작업

            // 숙제 - 이미 존재하는 값을 insert 시 예외 처리
        }
    }

    #insert(node, value) {
        if(node.value > value) { // 노드의 값보다 추가 할 값이 작다면
            if(node.left) { // 왼쪽 자식 노드가 있다면
                this.#insert(node.left, value); // 재귀를 통해 왼쪽 노드에게 insert를 위임
            } else { // 왼쪽 자식 노드가 없다면
                node.left = new Node(value); // 왼쪽 자식 노드로 추가
            }
        } else { // 노드의 값보다 추가 할 값이 크거나 같다면
            if(node.right) { // 오른쪽 자식 노드가 있다면 
                this.#insert(node.right, value); // 재귀를 통해 오른쪽 노드에게 insert를 위임
            } else { // 오른쪽 자식 노드가 없다면
                node.right = new Node(value); // 오른쪽 자식 노드로 추가
            }
        }
    }

    search(value) {
        if(!this.root) return null; // root 노드가 없다면 search 종료

        if(this.root.value === value) { // root 노드의 값과 찾는 값이 같다면
            return this.root; // root 노드 반환
        }

        // 찾는 값이 root가 아니라면
        return this.#search(this.root, value);  // 자식 노드로 search 작업 위임
    }

    #search(node, value) {
        if(node.value > value) { // 부모 노드보다 찾는 값이 작다면
            if(!node.left) return; // 만약 부모의 왼쪽 자식 노드가 없다면 #search 종료

            if(node.left.value === value) { // 부모의 왼쪽 자식 노드의 값이 찾는 값과 같다면
                return node.left; // 원하는 값의 노드 반환
            }

            // 찾는 값이 node가 아니라면
            return this.#search(node.left, value); // 자식 노드로 seacrh 작업 위임
        } else { // 부모 노드보다 찾는 값이 크거나 같다면
            if(!node.right) return; // 만약 부모의 오른쪽 자식 노드가 없다면 #search 종료

            if(node.right.value === value) { // 부모의 오른쪽 자식 노드의 값이 찾는 값과 같다면
                return node.right; // 원하는 값의 노드 반환
            }

            // 찾는 값이 node가 아니라면
            return this.#search(node.right, value); // 자식 노드로 search 작업 위임
        }
    }

    remove(value) {
        // 1. leaf -> 제거
        // 2. leaf x, 왼쪽 자식 노드가 없음 -> 오른쪽 자식 노드를 끌어 올림
        // 3. leaf x, 오른쪽 자식 노드가 없음 -> 왼쪽 자식 노드를 끌어 올림
        // 4. leaf x, 자식 노드가 2개(양쪽) -> 왼쪽 자식 노드들 중 가장 오른쪽 자식 노드와 변경
        
        this.root = this.#remove(this.root, value); // 제거할 노드가 없거나, leaf인 노드를 제거했다면 null

        return // 숙제 - length 반환
    }

    #remove(node, value) {
        if(!node) { // 제거할 값이 트리에 존재하지 않는 경우
            return null; // 제거할 값이 존재하지 않음
        }

        if(node.value === value) { // 제거할 값을 찾은 경우 (자식 노드 입장) - 찾지 못하면 else문이 동작하여 다음 자식 노드로 재귀
            // 1. leaf -> 제거
            if(!node.left && !node.right) { // node가 leaf인 경우
                return null; // 부모 노드에게 제거할 노드임을 알림
            } 
            // 2. leaf x, 왼쪽 자식 노드가 없음 -> 오른쪽 자식 노드를 끌어 올림
            else if(!node.left) { // 부모 노드의 왼쪽 자식만 없는 경우
                return node.right;
            } 
            // 3. leaf x, 오른쪽 자식 노드가 없음 -> 왼쪽 자식 노드를 끌어 올림
            else if(!node.right) { // 부모 노드의 오른쪽 자식만 없는 경우
                return node.left;
            } 
            // 4. leaf x, 자식 노드가 2개(양쪽) -> 왼쪽 자식 노드들 중 가장 오른쪽 자식 노드와 변경
            else { // 부모 노드의 자식이 모두(left, right) 있는 경우
                let exchange = node.left;
                
                while(exchange.right) { // 왼쪽 자식 노드들 중 가장 오른쪽 자식 노드에 접근 - (부모 노드보다 작으면서, 가장 큰 값)
                    exchange = exchange.right;
                }

                // 부모 노드보다 작으면서, 가장 큰 값(exchange)를 찾았다면, 부모 노드와 exchange 노드를 변경
                const temp = node.value;
                node.value = exchange.value;
                exchange.value = temp;

                node.left = this.#remove(node.left, temp); // 노드 변경 후 제거할 노드를 제거
                return node;
            }
        } else { // (부모 노드 입장) - else문에서 재귀를 통해 자식 노드로 (제거할 노드를 찾았다면)if문이 동작하는 개념
            if(node.value > value) { // 부모 노드보다 제거할 값이 작다면
                node.left = this.#remove(node.left, value); // 자식 노드에서 null을 반환했다면, node.left를 null로 적용하여 제거
                return node;
            } else { // 부모 노드보다 제거할 값이 크거나 같다면
                node.right = this.#remove(node.right, value); // 자식 노드에서 null을 반환했다면, node.right를 null로 적용하여 제거
                return node;
            }
        }
    }
}