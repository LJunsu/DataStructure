# 자료구조


+ ## 시간복잡도

+ 표기법
  자료구조, 알고리즘의 성능을 표기하기 위함
  
  최선보다는 최악을 중점으로

+ n
  배열의 길이(데이터의 총 갯수)
  
  배열에서 특정 값을 찾는 작업량 -> n

+ Big-O
  최악의 경우
  
+ Theta
  Big-O === Big-Omega
  
+ Big-Omega
  최선의 경우

+ 시간 복잡도 빅오 표기법
  O(1) : 최선(상수)
  
  O(log n) : for문 i++처럼 순차적인 흐름이 아닌, 곱하기, 나누기, 배수 등 조건이 절반이 되는 상황
  
  O(n) : for문 (i++)
  
  O(n log n) : 이중 for문 중 바깥 for문인 i는 n (i++), 안쪽 for문이 j는 (예: j * 2)인 경우 / 여기까지는 선방

  O(n^2) : 이중 for문 (i++)
  
  O(n^3) : 삼중 for문 (i++) / 마지노선
  
  O(2n) : X
  
  O(n!) : X

+ ## 연결 리스트 (Linked List)

+ 메모리에 [1, 2, 3, 4, 5] 형태의 배열과 객체가 존재한다면
  | A | B | C | D | E | F |
  | --- | --- | --- | --- | --- | --- |
  | 배열 | 1 | 2 | 3 | 4 | 5 |
  | 객체 | a | b | c | ~6 |   |
  
+ ## 스택 (Stack)

+ ## 큐 (Queue)

+ ## 트리 (Tree)

+ ## 이진 탐색 트리 (Birnary Search Tree)

+ ## 이진 힙 (Binary Heap)

+ ## 우선순위 큐 (Queue Priority)

+ ## 덱 (Deque)

+ ## 그래프 (Graph)

+ ## 해시 테이블 (Hash Table)

+ ## 레드 블랙 트리 (Red Black Tree)

+ ## 트리 순회 (Traversal)
