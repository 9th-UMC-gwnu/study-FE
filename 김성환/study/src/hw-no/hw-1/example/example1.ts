// 반환값에 타입을 붙이면 그것이 TS(중요)

// 문자열
const matthew: string = '매튜'; // 작은따옴표, 큰 따옴표 사용가능

let template: string = `안녕하세요, ${matthew}`; // 백틱 + 템플릿 리터럴 -> 안녕하세요 

console.log(template);

// 숫자
const age: number = 26;

let intNum: number = 42;
let floatNum: number = 3.14;
let hexNum: number = 0xff;   // 16진수
let binNum: number = 0b1010; // 2진수
let octNum: number = 0o52;   // 8진수

// 불리언 -> 참, 거짓
const isMac: boolean = true; // 참 
const isGram: boolean = false; // 거짓

// NULL -> undefined가 '값을 못찾음' 이라면 null은 '값이 없음'으로 의도적인 명시
const isNull: null = null;

let user: string | null = null; // 유니언 타입

// undefined -> 변수가 초기화 되지 않았을 때 자동으로 할당되는 값
const isUndefined: undefined = undefined;

let notInit: undefined;
console.log(notInit); // undefined

const obj: { key?: string } = {};
console.log(obj.key); // undefined

// Symbol -> 항상 고유한 값에 정보 은닉성을 부여해 줌(반복문에서 노출이 되지 않는다.)
const isSymbol: symbol = Symbol('symbol');

const user2 = {
    name: '매튜',
    [isSymbol]: '비밀 정보예요',
};

console.log(user2.name);        // 매튜
console.log(user2[isSymbol]);   // 비밀 정보예요
console.log(Object.keys(user2)); // ['name']만 보여요

//bigint -> 매우큰 정수를 정의할 때 사용되는 타입(2^53-1 부터 사용)
let bigNumber: bigint = 900930992547140991n;
let anotherBig: bigint = BigInt(12345678901234567890);

// 비교나 연산도 가능해요
console.log(bigNumber + 10n);  // 900930992547140, ... + 10n
console.log(bigNumber > anotherBig); // false

// object -> 객체 표현 타입(요소는 해시 방식으로 정의되어 있음)
const yaho: object = { yaho: 'yaho' };
// 단순히 object 타입이라 내부 속성에 바로 접근은 불가능해요.

let engName: { firstName: string; lastName: string } = { // 필드는 타입 어노테이션 형식을 따름
    firstName: "Ahn",
    lastName: "Ohtani"
};

console.log(engName.firstName); // Ahn
console.log(engName.lastName);  // Ohtani

