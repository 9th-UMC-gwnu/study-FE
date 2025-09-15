// TS만 존재하는 타입

//any -> 모든 타입에 대입 가능하고 any도 모든 타입으로 대입 가능
let anyVar: any = 10;
anyVar = true; // 이런 것도 가능함 -> 타입 명시가 정확하지 않아 사용이 비권장 되기도 한다.
// 활용 : 보통 JS -> TS 점진적 마이그레이션 초기에 사용된다.

//unknown -> 안전한 최상위 슈퍼 타입
function upper(v: unknown) { // unknown type으로 받아서 narrowing
    if (typeof v === 'string') return v.toUpperCase();
    return null;
}
// any를 안쓰는 이유 : type 트리 구조 상 unknown이 슈퍼 타입 인데 any타입 대입이 가능함

// void -> 아무 값이 없는 타입 (undefined만 할당 가능)
const func1 = (): void => {
    console.log('hello');
} // 다른 언어의 void 함수 처럼 동작을 정의할 때 사용 가능(return이 없다)

//never -> 공집합 타입 (undefined도 할당 불가 )
const func2 = (): never => {
    throw new Error();
} // 정상 작동이 아닐 경우 사용한다.

