export type TodoId = string;

export interface Todo {
    id: TodoId;
    name: string;
    done: boolean;
}

// 콜백 타입(재사용성 목적)
export type ToggleTodo = (id: TodoId) => void;
export type DeleteTodo = (id: TodoId) => void;
