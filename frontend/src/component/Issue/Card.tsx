import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import IssueInfo from "./Info";

export interface CardSummary {
  title: string;
  assignee: string;
  priority: string;
  storyPoint: number;
  key: string;
  dueDate: Date;
  status: string;
}

export default function IssueCard(summary: any) {
  const { title, assignee, priority, storyPoint, dueDate, issueId } = summary;
  console.log('due date', dueDate, typeof dueDate);

  return (
    <Card className="mb-2 w-90 hover:bg-blue-50">
      <CardContent>
        <Stack direction="column" spacing={2}>
          <div className="flex">
            <Typography>{title}</Typography>
          </div>
          <IssueInfo
            assignee={assignee}
            priority={priority}
            storyPoint={storyPoint}
            dueDate={dueDate}
            issueId={issueId}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
