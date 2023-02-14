import { Avatar, Tooltip } from "@mui/material";
import { useMemo } from "react";

export default function AssigneeAvatar({ name }: { name: string }) {
  const initial = useMemo(() => {
    if (!name) return 'UK';
    const words = name.split(" ");
    const firstname = words[1];
    const lastname = words[words.length - 1];
    if (words.length === 1) return firstname[0].toUpperCase();
    return firstname[0].toUpperCase() + lastname?.[0]?.toUpperCase();
  }, [name]);

  return (
    <Tooltip
      title={name}
      componentsProps={{
        tooltip: {
          className: "bg-white text-black border-black border rounded",
        },
      }}
    >
      <Avatar className="w-8 h-6 ml-1 text-sm text-white bg-indigo-600 rounded">
        {initial}
      </Avatar>
    </Tooltip>
  );
}
