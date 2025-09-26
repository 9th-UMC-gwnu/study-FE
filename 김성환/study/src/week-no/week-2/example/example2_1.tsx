// UseState -> 함수형 컴포넌트 안에서 상태(state)를 정의하고, 이 상태를 관리할 수 있게 해주는 훅

import { useState } from "react"

export default function example2_1() {
    const [count, setCount] = useState(0)

    const handleIncreaseNumber = () => {
        setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
    }
    // 이 경우 카운트는 1만 증가한다.
    // 이유 : React는 상태를 즉시 업데이트하지 않아요. 대신 함수가 실행될 당시의 상태(count)를 기억해 두고, 그 값으로 계산해요.
    // 즉, handleIncreaseNumber 안에서 count는 항상 0으로 고정된 것처럼 동작해요. (이전 값을 받아서 하는 방식으로 수정하면 6씩 증가)
    // setCount(prev => prev + 1)
    const handleMinusNumber = () => {
        setCount(count - 1)
    }
    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncreaseNumber} className="countBtn bg-blue-500">숫자 증가</button>
            <button onClick={handleMinusNumber} className="countBtn bg-red-500">숫자 감소</button>
        </>
    )
}