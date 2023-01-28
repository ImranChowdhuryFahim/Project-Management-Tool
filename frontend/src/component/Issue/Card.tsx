import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import IssueInfo from "./Info";

export interface CardSummary {
  title: string;
  assignee: string;
  priority: string;
  storyPoint: number;
  issueId: string;
  endDate: Date;
}

const dummyData: CardSummary = {
  title: "Time control is not user friendly. Find a better way for time input",
  assignee: "Irfanul Hoque",
  priority: "medium",
  issueId: "MVL-453",
  endDate: new Date("Mon Oct 16 2023 18:35:05 GMT+0600 (Bangladesh Standard Time)"),
  storyPoint: 40,
};

export default function IssueCard(summary: CardSummary) {
  const { title, assignee, priority, storyPoint, endDate } = summary;

  return (
    <Card className="mb-2 w-72 hover:bg-blue-50">
      <CardContent>
        <Stack direction="column" spacing={2}>
          <div className="flex">
            <Typography>{title}</Typography>
          </div>
          <IssueInfo assignee={assignee} priority={priority} storyPoint={storyPoint} endDate={endDate} />
        </Stack>
      </CardContent>
    </Card>
  );
}
