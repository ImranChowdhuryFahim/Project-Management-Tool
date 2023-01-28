import type { CardSummary } from "@/component/Issue/Card";
import { Stack } from "@mui/material";
import cardData from "@/data/issue-card.json";
import IssueCard from "@/component/Issue/Card";

interface StageColumn {
  title: string;
  cards: CardSummary[];
}

const transformedData: CardSummary[] = cardData.map((d) => ({
  ...d,
  endDate: new Date(d.endDate),
}));
const dummyData: StageColumn = {
  title: "In Progress",
  cards: transformedData,
};

export default function BoardColumn() {
  return (
    <div className="px-4 py-2 bg-blue-100 rounded-lg w-80">
      <div>
        <h1 className="mb-2 text-xl font-bold text-center text-indigo-800 uppercase">
          {dummyData.title}
        </h1>
      </div>
      <Stack>
        {dummyData.cards.map((data) => (
          <IssueCard
            title={data.title}
            assignee={data.assignee}
            priority={data.priority}
            storyPoint={data.storyPoint}
            endDate={data.endDate}
            issueId={data.issueId}
            key={data.issueId}
          />
        ))}
      </Stack>
    </div>
  );
}
