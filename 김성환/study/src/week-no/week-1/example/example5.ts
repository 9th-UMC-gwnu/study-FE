// Union Types -> 둘 이상의 타입을 허용해서, 변수가 여러 타입 중 하나를 가질 수 있음
let value: string | number; // string, number 허용

// 활용 -> 함수 argument나 return type에 많이 활용된다.
function printValue(value: string | number) { // parameter type 설정
    console.log(value);
}

printValue("Hello"); // 출력: Hello
printValue(123);     // 출력: 123

// Union type과 조건부 로직(Type Narrowing)
function process(value: string | number) {
    if (typeof value === "string") { // string일 경우
        console.log(`문자열 처리: ${value.toUpperCase()}`);
    } else {
        console.log(`숫자 처리: ${value.toFixed(2)}`); // 그 외(number)
    }
}

process("Hello"); // 문자열 처리: HELLO
process(123);     // 숫자 처리: 123.00

// Union type과 array
let mixedArray: (string | number)[] = ["Hello", 123, "World", 456]; // 해당 array는 string과 number를 property로 받음

// Union type과 literal type 결합
function move(direction: "left" | "right" | "up" | "down") {
    console.log(`You moved: ${direction}`);
}

move("left");    // 정상이에요
move("right");   // 정상이에요
// move("forward"); // ❌ 오류: forward는 허용되지 않아요

