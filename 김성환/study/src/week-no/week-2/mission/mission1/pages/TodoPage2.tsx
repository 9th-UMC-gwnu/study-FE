import React, { useCallback, useMemo, useState } from "react";
import TodoList from "../components/TodoList";
import type { Todo } from "../types";
// 분리된 Context import
import { TodoContext } from "../contexts/TodoContext";
import { useTheme } from "../../mission2/ThemeContext";
import type { Theme } from "../../mission2/types";

export default function TodoPage2() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    // 훅을 통해 주입된 값 가져오기(다크 모드)
    const { theme, setTheme } = useTheme();

    // 버튼 클릭 시 테마를 순환시키는 함수
    const handleThemeChange = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
    };

    // 현재 테마에 맞는 버튼 텍스트를 반환하는 함수
    const getButtonText = () => {
        if (theme === 'light') return '☀️ Light';
        if (theme === 'dark') return '🌙 Dark';
        return '💻 System';
    };

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
    // 삭제
    const deleteTodo = useCallback((id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const pendingTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);
    const completedTodos = useMemo(() => todos.filter((t) => t.done), [todos]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        addTodo();
    };

    const contextValue = { toggleTodo, deleteTodo, pendingTodos, completedTodos };

    return (
        // import한 TodoContext.Provider를 사용
        <TodoContext.Provider value={contextValue} >
            <div className="mx-auto max-w-2xl mt-[100px]  p-5 rounded-2xl shadow-2xl dark:bg-slate-600">
                <div className="flex justify-center items-center gap-4">
                    <h1 className="text-3xl font-bold text-center my-[20px] dark:text-white">YONG TODO</h1>
                    <button
                        onClick={handleThemeChange}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-white"
                    >
                        {getButtonText()}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="할 일 입력"
                        className="w-2/3 border border-gray-300 rounded-[8px] p-2 dark:text-white "
                    />
                    <button type="submit" className="bg-green-500 text-white p-3 rounded-[12px] font-medium transition-transform transform hover:scale-105 hover:bg-green-600">할 일 추가</button>
                </form>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 하위 요소는 의존성을 내려 받는다. -> 코드가 훨씬 깔끔하죠? */}
                    <TodoList title="할 일" type="pending" />
                    <TodoList title="완료" type="completed" />
                </div>
            </div>
        </TodoContext.Provider >
    );
}