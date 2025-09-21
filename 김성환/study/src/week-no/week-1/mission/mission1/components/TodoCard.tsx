import React from "react";
import type { Todo } from "../types";

type TodoCardProps = {
    todo: Todo;                         // 카드 요소(단일 할 일)
    onToggle: (id: string) => void;     // 완료 처리
    onDelete: (id: string) => void;     // 삭제 처리
};

/**
 * Todo 리스트의 카드 요소만 받음
 * 버튼은 상태에 따라 '완료' 또는 '삭제' 표시
 */
const TodoCard = React.memo(function TodoCard({
    todo,
    onToggle,
    onDelete,
}: TodoCardProps) {
    const handleClick = () => {
        if (todo.done) onDelete(todo.id);
        else onToggle(todo.id);
    };

    return (
        <div className="flex items-center justify-between rounded-[12px] bg-gray-100 p-4 shadow-lg mb-4">
            <p className="text-xl font-semibold">{todo.name}</p>
            <button onClick={handleClick} 
            className={`
                px-4 py-2 text-sm font-semibold text-white rounded-lg transition-transform transform hover:scale-105
                ${todo.done
                    ? 'bg-red-500 hover:bg-red-600'   // 삭제 버튼
                    : 'bg-green-500 hover:bg-green-600' // 완료 버튼
                }
            `}>
                {todo.done ? "삭제" : "완료"}
            </button>
        </div>
    );
});

export default TodoCard;
