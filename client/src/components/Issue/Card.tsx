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
    issueKey,
    index,
    id,
    columnId,
    projectId,
  } = summary;
  console.log("%c summary", "color: lime", summary);

  const router = useRouter();
  const { workspaceKey, projectKey } = router.query;

  return (
    <Draggable index={index} draggableId={id} key={id}>
      {(provided) => (
        <Card
          className="mb-2 bg-white border border-white rounded shadow cursor-move w-90"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link
            href={{
              pathname: `/workspace/${workspaceKey}/project/${projectKey}/issue/${issueKey}`,
              query: { columnId },
            }}
            className="cursor-move"
          >
            <CardContent>
              <Stack direction="column" spacing={2}>
                <div className="flex">
                  <Typography className="font-sans text-sm font-semibold tracking-wide text-gray-700">
                    {title}
                  </Typography>
                </div>
                <IssueInfo
                  assignee={assignee}
                  priority={priority}
                  storyPoint={storyPoint}
                  dueDate={dueDate}
                  issueKey={issueKey}
                />
              </Stack>
            </CardContent>
          </Link>
        </Card>
      )}
    </Draggable>
  );
}
