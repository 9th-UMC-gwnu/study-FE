import { useTodos } from "../context/TodoProvider";

export default function YetList() {
  const { toggleTodo, deleteTodo, yetTodo } = useTodos();

  return (
    <>
      {yetTodo.map((t) => (
        <div
          key={t.id}
          className="flex justify-between m-1 p-3 w-full shadow-xl rounded-sm"
          onDoubleClick={() => toggleTodo(t.id)}
        >
          <h1>{t.name}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => toggleTodo(t.id)}
              className="bg-green-500 rounded-sm text-white p-1"
            >
              완료
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
