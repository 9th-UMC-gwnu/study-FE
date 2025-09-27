import { useState } from "react";
import ListBox from "./components/ListBox";
import { useTodos } from "./context/TodoProvider";
import { useTheme } from "../chapter02/ThemeProvider";
import clsx from "clsx";

export default function Chapter01App() {
  const [input, setInput] = useState("");
  const { toggleThem, theme } = useTheme();
  const { addTodo } = useTodos();

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input.trim());
    setInput("");
  };

  return (
    <div className={clsx(theme === "LIGHT" ? "bg-white" : "bg-gray-800")}>
      <button
        onClick={toggleThem}
        className={clsx(
          "text-3xl",
          theme === "LIGHT" ? "text-black" : "text-white"
        )}
      >
        {theme === "LIGHT" ? "라이트 모드" : "다크 모드"}
      </button>
      <div className="flex items-center justify-center h-screen flex-col mx-28">
        <h1 className="text-5xl font-bold">YONG TODO</h1>
        <div className="flex items-center my-6 w-full justify-between">
          <input
            type="text"
            placeholder="할 일 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-sm p-3 border border-zinc-400 mr-4 flex-2"
          />
          <button onClick={handleAdd} className="bg-green-500 p-4 rounded-sm">
            <h3 className="text-white text-sm">할 일 추가</h3>
          </button>
        </div>
        <ListBox />
      </div>
    </div>
  );
}
