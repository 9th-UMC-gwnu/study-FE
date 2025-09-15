// 반환값에 Type을 붙이면 그게 TS 문법


// 문자열
const matthew: string = '매튜'; // 작은따옴표, 큰 따옴표 사용가능

let template: string = `안녕하세요, ${matthew}`; // 백틱 + 템플릿 리터럴 -> 안녕하세요 

console.log(template);