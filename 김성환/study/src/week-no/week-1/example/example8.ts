// interface 객체

// Merging Interfaces -> TS에선 같은 이름을 가니 여러 인터페이스가 선언되면 자동 Merge
interface UMC {
    name: string;
    nickname: string;
}

interface UMC {
    skill: string;
    // name : number; // 오류!
}

let member: UMC = { name: '김용민', nickname: '매튜', skill: 'WEB' };

// name space -> 코드를 모듈화하고 그룹화해서 관리할 수 있는 방법
// namespace A {
//     const a = 1;
//     export let b = a + 10;
// }

// namespace A {
//     export const c = 2;
//     b = 20;
// }
// 주의사항 : 그래도 이건 위험한 코드라 예상치 못한 병합을 막기위해 컴파일러 기본설정이 막아놓았다. 모듈 시스템(import/export)를 사용하도록 권장

// console.log(A.c); // 2
