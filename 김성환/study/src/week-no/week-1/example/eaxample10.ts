// TS Utility -> TS에서 지원하는 내부적인 유틸리티

// Pick -> 특정 property 선택
interface User {
    id: number;
    name: string;
    age: number;
    email: string;
}

// User에서 id와 name만 뽑아오기
type UserPreview = Pick<User, "id" | "name">;

const user: UserPreview = { id: 1, name: "김용민" };

// Omit -> 특정 프로퍼티 제외
type UserWithoutEmail = Omit<User, "email">; // email을 제외

const user2: UserWithoutEmail = { id: 1, name: "김용민", age: 27 }

// Record -> 객체의 키와 값 타입을 정의
type Role = "yongmin" | "matthew" | "goguma";

const roles: Record<Role, string> = {
    yongmin: "김용민",
    matthew: "매튜",
    goguma: "고구마"
};

// Partial -> 모든 프로퍼티를 선택적으로 정의
const updateUser = (user: Partial<User>) => {
    console.log(user);
};

// 모든 속성이 선택적이기 때문에 일부만 넘겨도 돼요
updateUser({ name: "김용민" });
updateUser({ age: 27 });
updateUser({}); // 아무것도 없어도 가능

// Required -> 모든 프로퍼티를 필수로 정의
interface RequiredUser {
    id?: number;
    name?: string;
    age?: number;
}

const createUser = (user: Required<RequiredUser>) => {
    console.log(user);
};

// 모든 속성을 다 넣어야 해요
createUser({ id: 1, name: "김용민", age: 27 });
// createUser({ name: "매튜" }); // 🚨 오류! id, age도 필요해요

// Readonly -> 모든 프로퍼티에 Readonly 속성 추가
interface ReadonlyUser {
    id: number;
    name: string;
}

const member: Readonly<ReadonlyUser> = { id: 1, name: "김용민" };

// ❌ 읽기 전용이라 수정할 수 없어요
// member.name = "매튜"; // 오류 발생

// Exclude -> 특정 타입 제거
type Status = "success" | "error" | "pending";

// "pending"을 제외하고 나머지 타입만 남겨요
type ExcludedStatus = Exclude<Status, "pending">;

const status1: ExcludedStatus = "success"; // ✅ 가능
const status2: ExcludedStatus = "error";   // ✅ 가능
// const status3: ExcludedStatus = "pending"; // ❌ 불가능

// Extract -> 특정 타입 추출
type ExtractStatus = "success" | "error" | "pending";

// "success"와 "error"만 뽑아요
type AllowedStatus = Extract<ExtractStatus, "success" | "error">;

const s1: AllowedStatus = "success"; // ✅ 가능
const s2: AllowedStatus = "error";   // ✅ 가능
// const s3: AllowedStatus = "pending"; // ❌ 불가능

// NonNullabe -> Null, undefined 제거
type UserName = string | null | undefined;
type ValidUserName = NonNullable<UserName>;

const name1: ValidUserName = "김용민"; // ✅ 가능
// const name2: ValidUserName = null;     // ❌ 불가능
// const name3: ValidUserName = undefined;// ❌ 불가능

// ReturnType -> 함수의 반환 타입 추출
function getUser() {
    return { id: 1, name: "김용민" };
}

// 함수 반환 타입 자동 추출
type UserType = ReturnType<typeof getUser>;

const user3: UserType = { id: 2, name: "매튜" }; // ✅ 가능

// Parameters -> 함수의 매개변수 타입을 튜플로 추출
function introduce(name: string, age: number) {
    return `${name}은 ${age}살이에요.`;
}

// 함수 매개변수 타입 추출
type IntroduceParams = Parameters<typeof introduce>;

const params: IntroduceParams = ["김용민", 27]; // ✅ 가능