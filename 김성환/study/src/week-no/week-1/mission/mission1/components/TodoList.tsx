import TodoCard from "./TodoCard";
import type { Todo, ToggleTodo, DeleteTodo } from "../types";

type TodoListProps = {
    title: string; // 제목
    todos: Todo[];              // 전체 목록
    onToggle: ToggleTodo;       // 완료 토글
    onDelete: DeleteTodo;       // 삭제
};

/**
 * - TodoCard를 map으로 반복 출력
 * - "할 일" / "완료" 두 상태를 구분하여 보여줌
 */
export default function TodoList({ todos, title, onToggle, onDelete }: TodoListProps) {
    return (
        <section>
            <h3 className="text-center text-2xl font-bold mb-4">{title}</h3>
            <div className="space-y-3">
                {todos.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </section>
    );
}
