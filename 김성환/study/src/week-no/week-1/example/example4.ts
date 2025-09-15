// 배열 타입
// 방법 1: string[]
const stringArray: string[] = ['야호', '고구마', '맥북'];

// 방법 2: 제네릭 Array<string>
const stringArray2: Array<string> = ['야호', '고구마', '맥북']; // 동작은 똑같음

// 배열의 문제점 -> 컴파일 에러 생성관련
const array = [1, 2, 3];

array[3].toFixed(2); // 존재하지 않는 요소(컴파일 단계에서 안막힘) -> 튜플로 해결 가능

// 튜플 -> 배열과 비슷하지만 각 요소의 타입과 순서가 고정되어 있다.
const tuple: [string, boolean, number] = ['매튜', true, 26];

// tuple[3].toFixed(2); // 컴파일 단계에서 에러 발생!

// 튜플 타입의 문제점 -> 배열 메서드 적용 관련
const tuple2: readonly [number, string, boolean] = [1, '야호', false]; // readonly를 통한 메서드 호출 시 컴파일 단계 오류 발생

// ❌ 에러 발생
// tuple2.push(4);
// tuple2.push(false);
// tuple2.push('매튜');
// tuple2.pop();
// tuple2.unshift();
// tuple2.shift();
