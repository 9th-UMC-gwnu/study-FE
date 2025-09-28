import Button from "./Button";
import { useCount } from "../useContext/CounterProvider";

const ButtonGroup = () => {
  const { handleIncrement, handleDecrement } = useCount();
  return (
    <div>
      {/* <button onClick={handleIncrement}>+1 증가</button> */}
      {/* <button onClick={handleDecrement}>-1 감소</button> */}
      <Button onClick={handleIncrement} text="+1 증가" />
      <Button onClick={handleDecrement} text="-1 감소" />
    </div>
  );
};

export default ButtonGroup;
