// 해시 테이블 - Hash Table
// JS 에서는 객체를 통해 대부분의 해시 테이블이 필요한 상황을 대체할 수 있음
// 단, 크기가 정해진 상황에는 해시 테이블의 해시 과정이 필요
class HashTable {
    data = []; // 해시 테이블 저장 공간(버킷 배열) - capa로 제한된 길이

    constructor(capa) {
        this.capa = capa;
    }

    // 해시 함수 - 키를 테이블 인덱스로 변환
    hashF(key) {
        return key % this.capa;
    }

    // key, value 쌍을 저장
    insert(key, value) {
        const hash = this.hashF(key); // 키를 해시로 변환

        if(!this.data[hash]) {
            // 버킷(bucket) - 해시 테이블에서 같은 해시 값을 가지는 데이터들이 저장되는 공간
            this.data[hash] = []; // 버킷이 없다면 초기화 - 충동 대비용 배열
        }

        this.data[hash].push({key, value}); // 해당 버킷에 삽입 (체이닝 방식)
    }
    
    // key로 value 찾기
    search(key) {
        const hash = this.hashF(key); // 키를 해시로 변환

        // hash는 key % capa로 계산한 값으로, 같은 hash 값을 가진 여러 key들이 data[hash]에 저장됨
        // data[hash]로 버킷(버킷)에 접근한 뒤 해당 배열 내에서 key 값이 일치하는 항목을 찾아 반환
        if(this.data[hash]) {
            for(let i = 0; i < this.data[hash].length; i++) {
                if(this.data[hash][i].key === key) {
                    return this.data[hash][i].value;
                }
            }
        }

        return null;
    }

    // 해당 key의 value를 새 값으로 업데이트
    update(key, value) {
        const hash = this.hashF(key);

        // key % capa로 구한 hash 인덱스에 접근
        // 해당 버킷(배열) 내에서 key가 일치하는 항목을 찾아 그 항목의 value 값을 새 값으로 갱신
        if(this.data[hash]) {
            for(let i = 0; i < this.data[hash].length; i++) {
                if(this.data[hash][i].key === key) {
                    this.data[hash][i].value = value;
                }
            }
        }
    }

    delete(key) {
        const hash = this.hashF(key);

        // key % capa로 구한 hash 인덱스에 접근
        // 해당 버킷(배열) 내에서 key가 일치하는 항목을 찾아 해당 항목을 배열에서 제거
        if(this.data[hash]) {
            for(let i = 0; i < this.data[hash].length; i++) {
                if(this.data[hash][i].key === key) {
                    this.data[hash].splice(i, 1);
                }
            }
        }
    }
}

const ht = new HashTable(30); // 크기 30짜리 해시 테이블 생성

ht.insert(31, "a"); // 31 % 30 = 1 -> 버킷 1에 저장
ht.insert(61, "b"); // 61 % 30 = 1 -> 버킷 1에 저장(충돌 발생 -> 체이닝)
ht.insert(83, "c"); // 83 % 30 = 23 -> 버킷 23에 저장
ht.insert(115, "d"); // 115 % 30 = 25 -> 버킷 25에 저장
console.log(ht.search(61));
console.log(ht.search(99));
ht.update(83, "C");
ht.delete(31);
