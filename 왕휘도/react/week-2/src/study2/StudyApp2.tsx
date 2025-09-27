import ButtonGroup from "./components/ButtonGroup";
import { useCount } from "./useContext/CounterProvider";

function StudyApp2() {
  const { count } = useCount();
  //타입 가드를 useCount에서 해주기에 옵셔널은 아래서 뺴도 됨 !
  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default StudyApp2;
