import { Stack } from "@mui/material";
import IssueCard from "@/component/Issue/Card";
import AddIssue from "../Issue/AddIssue";
import { Droppable } from "react-beautiful-dnd";

export default function BoardColumn({
  title,
  cards,
  projectId,
  columnId,
  setBoard,
}: any) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="px-3 py-2 mx-2 bg-blue-100 rounded-lg w-96"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <h1 className="mb-2 text-xl font-bold text-center text-blue-800 uppercase">
              {title}
            </h1>
          </div>
          {provided.placeholder}
          <Stack>
            {cards.map((card: any, index: any) => (
              <IssueCard
                title={card.title}
                assignee={card.assignee}
                priority={card.priority}
                storyPoint={card.storyPoint}
                dueDate={card.dueDate}
                issueKey={card.key}
                status={card.status}
                key={card._id}
                id={card._id}
                index={index}
                columnId={columnId}
                projectId={projectId}
              />
            ))}
          </Stack>
          <AddIssue
            projectId={projectId}
            columnId={columnId}
            setBoard={setBoard}
          />
        </div>
      )}
    </Droppable>
  );
}
