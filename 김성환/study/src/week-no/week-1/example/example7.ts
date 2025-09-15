// 타입 별칭(Type Aliases) -> 복잡한 타입을 간단한 이름으로 정리해서 재사용이 가능함

// 타입 별칭 사용
type Matthew = 'Matthew';
const yongminEnglishName: Matthew = 'Matthew';

// Union Type과 함께 사용
type UmcPartType = 'WEB' | 'SPRING' | 'NODE' | 'PLAN' | 'DESIGN' | 'ANDROID' | 'IOS'; // OS별 분기를 위해 사용

// 여러 타입을 묶어서 사용
type Name = string;
type Nickname = string;

type Member = Name | Nickname;

// 객체 타입에 사용(정말 많이씀) -> React에서 props 정의나 api 데이터를 매핑할 경우 사용
type UMC = {
    nickname: string;
    part: string;
}

let member: UMC = { nickname: 'Matthew', part: 'WEB' };

// &(intersection)
type TNickname = { nickname: string }
type TName = { name: string }

type TMember = TNickname & TName;

let me: TMember = {
    name: '김용민',
    nickname: '매튜'
};

//