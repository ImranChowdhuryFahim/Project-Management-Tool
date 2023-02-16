import { Chip, Typography, Tooltip } from "@mui/material";
import AssigneeAvatar from "../utils/AssigneeAvatar";
import Priority from "./Priority";

export default function IssueInfo({
  priority,
  storyPoint,
  assignee,
  dueDate,
  issueId,
}: {
  priority: string;
  storyPoint: number;
  assignee: string;
  dueDate: Date;
  issueId: string;
}) {
  const isDueToday =
    new Date(dueDate).toDateString() === new Date().toDateString();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Priority priority={priority} />
        <Tooltip
          title={`${storyPoint ?? 10} Story Point`}
          componentsProps={{
            tooltip: {
              className: "bg-white text-black border-black border rounded",
            },
          }}
        >
          <Chip label={storyPoint ?? 10} size="small" className="rounded" />
        </Tooltip>
        <AssigneeAvatar name={assignee} />
      </div>
      <div className="flex justify-end">
        {isDueToday ? (
          <Chip
            label="Due Today"
            size="small"
            color="error"
            className="mr-2 rounded"
          />
        ) : null}
        <Chip label={issueId} size="small" className="rounded" />
      </div>
    </div>
  );
}
