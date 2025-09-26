import TodoCard from "./TodoCard";
import { useTodos } from "../contexts/TodoContext";

type TodoListProps = {
    title: string; // 제목
    type: 'pending' | 'completed' // 할일 | 완료 
};

/**
 * - TodoCard를 map으로 반복 출력
 * - "할 일" / "완료" 두 상태를 구분하여 보여줌
 */
export default function TodoList({ title, type }: TodoListProps) {
    const { pendingTodos, completedTodos, toggleTodo, deleteTodo } = useTodos();

    const todosToRender = type === 'pending' ? pendingTodos : completedTodos;

    return (
        <section>
            <h3 className="text-center text-2xl font-bold mb-4 dark:text-white">{title}</h3>
            <div className="space-y-3">
                {todosToRender.map((todo) => (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>
        </section>
    );
}
