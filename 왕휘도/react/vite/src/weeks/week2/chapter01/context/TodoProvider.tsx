import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo } from "../tpye";

export interface TodoProviderType {
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  addTodo: (name: string) => void;
  yetTodo: Todo[];
  doneTodo: Todo[];
}

export const TodoContext = createContext<TodoProviderType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const addTodo = (name: string) => {
    setTodos((prev) => {
      return [...prev, { id: Date.now(), name, done: false }];
    });
  };

  const yetTodo = todos.filter((t) => !t.done);
  const doneTodo = todos.filter((t) => t.done);

  return (
    <TodoContext.Provider
      value={{ toggleTodo, deleteTodo, addTodo, yetTodo, doneTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodos는 반드시 TodoProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
