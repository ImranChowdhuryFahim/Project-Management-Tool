import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Draggable } from "react-beautiful-dnd";
import IssueInfo from "./Info";

export default function IssueCard(summary: any) {
  const { title, assignee, priority, storyPoint, dueDate, issueId, index, id } =
    summary;
  console.log("due date", dueDate, typeof dueDate);
  console.log("summary", summary);
  return (
    <Draggable index={index} draggableId={id} key={id}>
      {(provided) => (
        <Card
          className="mb-2 w-90 hover:bg-blue-50"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  );
}
