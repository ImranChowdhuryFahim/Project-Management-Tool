import { DensityMedium, LowPriority, PriorityHigh } from "@mui/icons-material";
import { Tooltip, Chip, Avatar } from "@mui/material";
import { useMemo } from "react";

export default function Priority({ priority }: { priority: string }) {
  const title = useMemo(() => {
    switch (priority) {
      case "HIGH":
        return "High Priority";
      case "MEDIUM":
        return "Medium Priority";
      default:
        return "Low Priority";
    }
  }, [priority]);

  const icon = useMemo(() => {
    switch (priority) {
      case "HIGH":
        return <PriorityHigh color="error" className="text-sm" />;
      case "MEDIUM":
        return <DensityMedium color="warning" className="text-sm" />;
      default:
        return <LowPriority color="action" className="text-sm" />;
    }
  }, [priority]);

  const styles = useMemo(() => {
    switch (priority) {
      case "high":
        return "bg-white text-red-600 border-red-600 rounded";
      case "medium":
        return "bg-white text-orange-600 border-orange-600 border rounded";
      default:
        return "bg-white text-black border-black rounded";
    }
  }, [priority]);

  return (
    <Tooltip
      title={title}
      componentsProps={{
        tooltip: { className: styles },
      }}
    >
      <Avatar className="w-4 h-4 mr-1 text-sm font-bold bg-white border">
        {icon}
      </Avatar>
    </Tooltip>
  );
}
