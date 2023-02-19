import { reqInstance } from "@/pages/board/[boardID]";
import { Card } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";

export default function ListBoard() {
  const [projects, setProjects] = useState([]);
  const workspaceKey = "WR";
  console.log("%c projects", "color: teal", projects);

  useEffect(() => {
    reqInstance
      .get(`http://localhost:4000/api/workspace/${workspaceKey}/projects`)
      .then((data) => setProjects(data.data.projects));
  }, []);

  return (
    <div className="mx-auto my-4 w-96">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900">
        List of projects
      </h1>

      <div className="">
        {projects.map((project: any) => (
          <Link
            href={`http://localhost:4200/board/${project.key}`}
            key={project.key}
          >
            <Card className="px-4 py-5 mb-2 bg-white border border-white rounded shadow w-90">
              <h1 className="text-xl font-bold text-gray-900 ">
                {project.title}
              </h1>
              <p className="font-sans text-sm tracking-wide text-gray-700">
                {project.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
      <AddProject workspaceKey={workspaceKey} setProjects={setProjects} />
    </div>
  );
}
