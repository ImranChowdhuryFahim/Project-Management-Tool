import BoardColumn from "@/component/Board/Column";
import { dummyCardSummary } from "@/data/mockData";
import axios from "axios";
import { useEffect, useState } from "react";

export const reqInstance = axios.create({
  headers: {
    "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VhZGRiNmM0OWUzZDU3YjU2NWRlZjYiLCJpYXQiOjE2NzYzMzY1OTd9.mDlMv6sAmTDZcPL8_mfkROrLC6iGgC8LY42X9-m-yOI",
    accept: "*/*",
  },
});

export default function Board() {
  const [board, setBoard]: any = useState({});
  console.log("%c board", "color: orange", board);

  useEffect(() => {
    reqInstance
      .get("http://localhost:4000/api/workspace/WR/project/PR1/board")
      .then((data) => setBoard(data.data.board));
  }, []);

  return (
    <div className="flex w-4/5 mx-auto mt-10">
      {board?.columns?.map((col: any) => (
        <BoardColumn
          title={col.title}
          cards={col.issues}
          key={col._id}
          projectId={board.projectKey}
          columnId={col._id}
        />
      ))}
    </div>
  );
}
