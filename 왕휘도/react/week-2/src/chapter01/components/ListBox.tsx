import DoneList from "./DoneList";
import YetList from "./YetList";

export default function ListBox() {
  return (
    <div className="flex flex-row gap-7 w-full">
      <div className="w-full justify-between flex-1">
        <h1 className="text-3xl font-bold w-full text-center">할 일</h1>
        <YetList />
      </div>

      <div className="w-full justify-between flex-1">
        <h1 className="text-3xl font-bold text-center">완료</h1>
        <DoneList />
      </div>
    </div>
  );
}
