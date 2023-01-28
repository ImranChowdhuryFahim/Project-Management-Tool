import { Avatar, Tooltip } from "@mui/material";
import { useMemo } from "react";

export default function AssigneeAvatar({ name }: { name: string }) {
  console.log("%c name: ", 'color: orange', name);
  const initial = useMemo(() => {
    const [firstname, ...rest] = name.split(" ");
    const lastname = rest.at(-1);
    if (!lastname) return firstname[0].toUpperCase();
    return firstname[0].toUpperCase() + lastname[0].toUpperCase();
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
