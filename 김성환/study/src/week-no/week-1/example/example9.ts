// Generic -> 다양한 타입 재사용을 위해 사용하는 문법(자주 씀)
function identity<T>(arg: T): T { // 유연성과 타입 안전성까지 챙김 (T는 parameter의 타입을 따라감)
    return arg;
}

// 사용 시점에 타입 지정
let result = identity<number>(42); // T = number

// 예제2 - 다양한 배열 타입을 변수로 받을 경우
const returnFitstValue = <T>(data: T[]) => { // 내부 타입 추론으로 return은 <T>로 추론
    return data[0];
}

let num = returnFitstValue([0, 1, 2]); //0
let str = returnFitstValue([1, 'hello', 'my name is']); // 1

// 예제3 - 타입 변수 제한
const getLength = <T extends { length: number }>(data: T) => { // 해당 타입의 length 속성을 상속받아 number로 반환
    return data.length;
}

getLength("123"); // 3 string type은 length 속성을 가짐

