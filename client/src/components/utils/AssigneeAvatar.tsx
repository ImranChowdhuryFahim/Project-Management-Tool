import { Avatar, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function AssigneeAvatar({ name }: { name: string }) {
  const initial = useMemo(() => {
    if (!name) return "";
    const words = name.split(" ");
    const firstname = words[0];
    const lastname = words[words.length - 1];
    if (words.length === 1) return firstname[0].toUpperCase();
    return firstname[0].toUpperCase() + lastname?.[0]?.toUpperCase();
  }, [name]);

  return name ? (
    <Tooltip
      title={name}
      componentsProps={{
        tooltip: {
          className: "bg-white text-black border-black border rounded",
        },
      }}
    >
      <Avatar
        className="ml-1 text-sm text-white bg-indigo-600 rounded"
        sx={{ height: 24 }}
        variant="square"
      >
        {initial}
      </Avatar>
    </Tooltip>
  ) : null;
}
