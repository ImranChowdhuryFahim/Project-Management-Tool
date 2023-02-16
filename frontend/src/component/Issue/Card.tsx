import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { Draggable } from "react-beautiful-dnd";
import IssueInfo from "./Info";

export default function IssueCard(summary: any) {
  const {
    title,
    assignee,
    priority,
    storyPoint,
    dueDate,
    issueId,
    index,
    id,
    columnId,
    projectId,
  } = summary;

  const router = useRouter();
  const { boardID: projectKey } = router.query;

  return (
    <Draggable index={index} draggableId={id} key={id}>
      {(provided) => (
        <Card
          className="mb-2 w-90 hover:bg-blue-50 cursor-move"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link
            href={{
              pathname: `http://localhost:4200/board/${projectKey}/issue/${issueId}`,
              query: { columnId, projectId, projectKey, issueKey: issueId },
            }}
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
          </Link>
        </Card>
      )}
    </Draggable>
  );
}
