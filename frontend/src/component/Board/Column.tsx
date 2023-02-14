import type { CardSummary } from "@/component/Issue/Card";
import { Stack } from "@mui/material";
import IssueCard from "@/component/Issue/Card";
import AddIssue from "../Issue/AddIssue";

export interface StageColumn {
  title: string;
  columnId: string;
  projectId: string;
  cards: CardSummary[];
}

export default function BoardColumn({
  title,
  cards,
  projectId,
  columnId,
}: StageColumn) {
  return (
    <div className="px-3 py-2 mx-2 bg-blue-100 rounded-lg w-96">
      <div>
        <h1 className="mb-2 text-xl font-bold text-center text-indigo-800 uppercase">
          {title}
        </h1>
      </div>
      <Stack>
        {cards.map((data) => (
          <IssueCard
            title={data.title}
            assignee={data.assignee}
            priority={data.priority}
            storyPoint={data.storyPoint}
            dueDate={data.dueDate}
            issueId={data.key}
            status={data.status}
            key={`${data.key}-${data.title}`}
          />
        ))}
      </Stack>
      <AddIssue projectId={projectId} columnId={columnId} />
    </div>
  );
}
