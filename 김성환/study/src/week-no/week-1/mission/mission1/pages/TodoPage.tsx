import React, { useCallback, useState } from "react";
import TodoList from "../components/TodoList";
import type { Todo } from "../types";

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");
    // ID를 통해 List 관리
    const genId = () =>
        typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`;
    // 추가
    const addTodo = useCallback(() => {
        const name = input.trim();
        if (!name) return;
        setTodos((prev) => [...prev, { id: genId(), name, done: false }]);
        setInput("");
    }, [input]);
    // 토글
    const toggleTodo = useCallback((id: string) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }, []);
    // 지우기
    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // 여기서 할 일 / 완료 분리
    const pendingTodos = todos.filter((t) => !t.done);
    const completedTodos = todos.filter((t) => t.done);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        addTodo();
    };

    return (
        <div className="mx-auto max-w-2xl mt-[100px]  p-5 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center my-[20px]">YONG TODO</h1>

            <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="할 일 입력"
                    className="w-2/3 border border-gray-300 rounded-[8px] p-2 "
                />
                <button type="submit" className="bg-green-500 text-white p-3 rounded-[12px] font-medium transition-transform transform hover:scale-105 hover:bg-green-600">할 일 추가</button>
            </form>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <TodoList
                    title="할 일"
                    todos={pendingTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                />
                <TodoList
                    title="완료"
                    todos={completedTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                />
            </div>
        </div>
    );
}
