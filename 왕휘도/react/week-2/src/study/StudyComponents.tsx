export type Tech =
  | "REACT"
  | "NEXT"
  | "VUE"
  | "SVELTE"
  | "ANGULAR"
  | "REACT-NATIVE";
//그냥 인터페이스로 string으로 정의 할수도 있지만 타입을 이용해서 유니온으로 특정 리터럴 값만 허용하도록 만드느것도 좋음
interface ListProps {
  tech: Tech;
}

export default function List({ tech }: ListProps) {
  return <li>{tech}</li>;
}
