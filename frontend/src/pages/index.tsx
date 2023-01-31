import BoardColumn from '@/component/Board/Column';
import { dummyCardSummary } from "@/data/mockData"

export default function Home() {
  return (
    <div className="flex w-4/5 mx-auto mt-10">
      <BoardColumn title='To Do' cards={dummyCardSummary(10, "To Do")} />
      <BoardColumn title='In Progress' cards={dummyCardSummary(10, "In Progress")} />
      <BoardColumn title='Done' cards={dummyCardSummary(10, "Done")} />
    </div>
  );
}
