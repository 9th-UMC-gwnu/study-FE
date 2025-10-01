import { useTodos } from "../context/TodoProvider";

export default function DoneList() {
  const { toggleTodo, deleteTodo, doneTodo } = useTodos();
  return (
    <>
      {doneTodo.map((t) => (
        <div
          key={t.id}
          className="flex justify-between m-1 shadow-xl rounded-sm p-3"
          onDoubleClick={() => toggleTodo(t.id)}
        >
          <h1 className="line-through text-zinc-500">{t.name}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => toggleTodo(t.id)}
              className="bg-yellow-500 rounded-sm text-white p-1"
            >
              되돌리기
            </button>
            <button
              onClick={() => {
                if (confirm(`'${t.name}' 항목을 삭제하시겠습니까?`))
                  deleteTodo(t.id);
              }}
              className="bg-red-500 rounded-sm text-white p-1"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
