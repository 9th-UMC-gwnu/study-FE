// 리터럴 타입 -> 특정한 그 값 자체를 허용
const name: "Matthew" = "Matthew"; // 정상
// const name2: "Matthew" = "Yaho"; // ❌ 오류: '"Yaho"' 형식은 '"Matthew"' 형식에 할당할 수 없어요.

// 숫자 리터럴
const age: 30 = 30; // 정상

// 객체 리터럴 타입 -> 특정 구조와 값을 가진 객체만 허용
const person: { name: string; age: number } = { // 1. 타입 구조 맞추고
    name: "Matthew", // 2. 정의된 속성만 가질 수 있고
    age: 27 // 3. 명시되지 않은 추가 속성 추가 불가
};

// 인덱스 시그니쳐를 통한 추가 속성 받기
const person2: { name: string; age: number;[key: string]: any } = { // 임의의 문자열 키 허용
    name: "Matthew",
    age: 27,
    job: "Software Developer" // any 타입을 통해 받기 때문에 오류없음 -> [key : string] : string 형식으로 안전하게 사용도 가능
};

// 선택적 프로퍼티 -> 보통 요소를 명시할 경우 필수 값 이지만 있어도 되고 없어도 되는 값을 사용할 때 많이 씀
// 특히 컴포넌트에서 기본 속성이나 동작을 정의하고 부모에서 오버라이딩으로 호출할 경우 이걸 많이 씀
const person3: { name: string; age?: number } = { // age는 optional
    name: "Matthew"
};

// as const를 통한 읽기 전용, 리터럴 설정
const matthew = { name: 'matthew' } as const;

// 객체 리터럴 타입과 읽기 전용 프로퍼티
const person4: { readonly name: string; age: number } = {
    name: "Matthew",
    age: 30
};

person4.age = 31;    // ✅ 가능 (age는 readonly가 아님)
// person4.name = "John";// ❌ 오류: 'name'은 읽기 전용이므로 값을 변경할 수 없어요.