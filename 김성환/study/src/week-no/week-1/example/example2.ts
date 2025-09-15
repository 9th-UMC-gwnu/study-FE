// 함수에서의 TS(중요)

// 기본 사용 (return, parameter 타입 명시)
// 매개변수 a, b는 number 타입이고, 반환값도 number 타입이에요
function add(a: number, b: number): number {
    return a + b;
}

// 매개변수 name은 string 타입이고, 반환값은 string 타입이에요
function greet(name: string): string {
    return `안녕하세요, ${name}입니다`;
}

// 함수 선언식 예시 -> export default 방식에선 function 키워드 사용해줘야 함
function minus(x: number, y: number): number {
    return x - y;
}

// 화살표 함수 -> 유틸리티, 다중요소 내보내기 일 경우(named export 방식을 사용할 경우 해당 방식 사용)
const getFullname = (firstName: string, lastName: string): string => {
    return firstName + lastName;
};

const fullName = getFullname('김', '용민');
console.log(fullName); // "김용민"