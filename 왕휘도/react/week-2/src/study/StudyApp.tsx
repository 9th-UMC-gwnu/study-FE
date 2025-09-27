import List from "./StudyComponents";

function StudyApp() {
  const nickname = "매튜";
  const sweetPotato = "고구마";
  const array = [
    "REACT",
    "NEXT",
    "VUE",
    "SVELTE",
    "ANGULAR",
    "REACT-NATIVE",
  ] as const; //const로 하여 배열이아니라 각자의 리터럴 string으로 해서 호환
  return (
    <>
      <strong className="school">상명대학교</strong>
      <p style={{ color: "purple", fontWeight: "bold", fontSize: "3rem" }}>
        {nickname}/김용민
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho, idx) => (
          //인덱스말고 서버에서 내려주는 id로 변경
          <List key={idx} tech={yaho} />
        ))}
      </ul>
    </>
  );
}

export default StudyApp;
