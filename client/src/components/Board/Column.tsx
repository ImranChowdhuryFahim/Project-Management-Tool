import { Stack } from "@mui/material";
import IssueCard from "@/components/Issue/Card";
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
          className="px-3 py-3 mr-4 bg-gray-100 rounded column-width w-96"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <h1 className="mb-2 font-sans text-sm font-semibold tracking-wide text-gray-700">
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
          {title.toLowerCase() === "to do" ? (
            <AddIssue
              projectId={projectId}
              columnId={columnId}
              setBoard={setBoard}
            />
          ) : null}
        </div>
      )}
    </Droppable>
  );
}
