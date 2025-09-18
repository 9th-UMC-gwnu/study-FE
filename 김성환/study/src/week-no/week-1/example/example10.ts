// Enum(열거형) -> 이름이 있는 상수의 집합
// number
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

let dir: Direction = Direction.Up;
console.log(dir); // 0

// string
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let myColor: Color = Color.Green;
console.log(myColor); // "GREEN"

// 양방향 매핑
enum Role {
    Admin = 1,
    User,
    Guest
}

console.log(Role[1]);      // "Admin"
console.log(Role.Admin);   // 1

// 장점
// 1. 가독성 증가
// 2. 관련 값들을 한 곳에서 관리 -> 유지보수성 증가
// 3. 잘못된 값을 쓰면 컴파일 단계에서 알려줌 -> 타입 안정성 증가
