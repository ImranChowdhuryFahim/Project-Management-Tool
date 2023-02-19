import BoardColumn from "@/component/Board/Column";
import { dummyCardSummary } from "@/data/mockData";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export const reqInstance = axios.create({
  headers: {
    "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YxOGRiMWNjYzE0Yzc1Mzc4ODEwN2IiLCJpYXQiOjE2NzY3NzQ4NTZ9.rtYM2CIWchaUuzBgHF1n-cC2R56oS2EuZiA9KYw90p8",
    accept: "*/*",
  },
});

export default function Board() {
  const [board, setBoard]: any = useState({});
  const router = useRouter();
  const { boardID } = router.query;

  console.log("%c board", "color: orange", board);

  useEffect(() => {
    reqInstance
      .get(`http://localhost:4000/api/workspace/WR/project/${boardID}/board`)
      .then((data) => setBoard(data.data.board));
  }, []);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    console.log("RESULT", result);

    if (source.droppableId === destination.droppableId) {
      reqInstance.put(`http://localhost:4000/api/issue/${draggableId}/move`, {
        columnId: source.droppableId,
        fromIndex: source.index,
        toIndex: destination.index,
      });
    } else {
      reqInstance
        .put(`http://localhost:4000/api/issue/${draggableId}/switch`, {
          fromColumnId: source.droppableId,
          toColumnId: destination.droppableId,
          fromIndex: source.index,
          toIndex: destination.index,
        })
        .then(console.log);
    }

    const sourceColIndex = board?.columns?.findIndex(
      (col: any) => col._id === source.droppableId
    );
    const destinationColIndex = board?.columns?.findIndex(
      (col: any) => col._id === destination.droppableId
    );
    const card = board.columns[sourceColIndex].issues[source.index];

    board.columns[sourceColIndex].issues.splice(source.index, 1);
    board.columns[destinationColIndex].issues.splice(
      destination.index,
      0,
      card
    );
    setBoard({ ...board });
  };

  return (
    <div className="flex w-4/5 min-h-screen py-12 mx-auto mt-10 overflow-x-scroll">
      <DragDropContext onDragEnd={onDragEnd}>
        {board?.columns?.map((col: any) => (
          <BoardColumn
            title={col.title}
            cards={col.issues}
            key={col._id}
            projectId={board.projectKey}
            columnId={col._id}
            setBoard={setBoard}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
