import { Chip, Typography, Tooltip } from "@mui/material";
import AssigneeAvatar from "../AssigneeAvatar";
import Priority from "./Priority";

export default function IssueInfo({
  priority,
  storyPoint,
  assignee,
  endDate,
}: {
  priority: string;
  storyPoint: number;
  assignee: string;
  endDate: Date;
}) {
  const isDueToday = endDate.toDateString() === new Date().toDateString();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <Priority priority={priority} />
        <Tooltip
          title={`${storyPoint} Story Point`}
          componentsProps={{
            tooltip: {
              className: "bg-white text-black border-black border rounded",
            },
          }}
        >
          <Chip label={storyPoint} size="small" className="rounded" />
        </Tooltip>
        <AssigneeAvatar name={assignee} />
      </div>
      <div className="flex justify-end">
        {isDueToday ? (
          <Chip label="Due Today" size="small" color="error" className="mr-2 rounded" />
        ) : null}
        <Chip label="MVL-453" size="small" className="rounded" />
      </div>
    </div>
  );
}
