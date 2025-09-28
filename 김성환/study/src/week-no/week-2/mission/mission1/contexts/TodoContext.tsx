import { createContext, useContext } from "react";
import type { Todo } from "../types";

// Context가 가지게 될 값의 타입
export interface TodoContextType {
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  pendingTodos: Todo[];
  completedTodos: Todo[];
}

// Context를 생성
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// context 호출 hook
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) { // context undefined 예외 처리
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};