import clsx from "clsx";
import DoneList from "./DoneList";
import YetList from "./YetList";
import { useTheme } from "../../chapter02/ThemeProvider";

export default function ListBox() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-row gap-7 w-full">
      <div className="w-full justify-between flex-1">
        <h1
          className={clsx(
            "text-3xl font-bold w-full text-center",
            theme === "DARK" ? "text-white" : "text-black"
          )}
        >
          할 일
        </h1>
        <YetList />
      </div>

      <div className="w-full justify-between flex-1">
        <h1
          className={clsx(
            "text-3xl font-bold w-full text-center",
            theme === "DARK" ? "text-white" : "text-black"
          )}
        >
          완료
        </h1>
        <DoneList />
      </div>
    </div>
  );
}
