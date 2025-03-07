import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Note, Effort, Priority } from "../types";
import { HamburgerMenuIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useNotes from "../hooks/useNotes";
import useEventEmitter from "../hooks/useEventEmitter";

interface Props {
  note: Note;
}

function Note({ note }: Props) {
  const { updateNote, deleteNote } = useNotes();
  const eventEmitter = useEventEmitter();

  function getDueDateFirstLetters(dueDate: string) {
    const indexes = [0, 1, 2];
    return indexes.map((index) => dueDate.charAt(index)).join("");
  }

  function getEffortMeter(effort: Effort) {
    const MAX_METER_SIZE = 3;

    const effortMap: Record<Effort, number> = {
      easy: 1,
      moderate: 2,
      hard: 3,
    };

    const filledMeterCount = effortMap[effort];

    const effortMeter = Array.from(
      { length: filledMeterCount },
      (_curr, index) => ({
        id: index,
        isColored: true,
      })
    );

    while (effortMeter.length < MAX_METER_SIZE) {
      effortMeter.push({ id: Math.random() * 100_000, isColored: false });
    }

    return effortMeter;
  }

  function getPriorityColor(priority: Priority) {
    const priorityMap: Record<Priority, string> = {
      low: "bg-priority-low",
      medium: "bg-priority-medium",
      high: "bg-priority-high",
    };

    return priorityMap[priority];
  }
  return (
    <div
      key={note.id}
      className="flex relative flex-col p-3 gap-2 justify-center rounded-xl items-start bg-white"
    >
      <p className="text-md font-bold truncate w-44">{note.name}</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 items-center">
          <div
            className={[
              "text-white py-0 px-2 capitalize rounded-md",
              getPriorityColor(note.priority),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p className="text-sm font-light">
              {getDueDateFirstLetters(note.due_date)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {getEffortMeter(note.effort).map((meter) => (
              <div
                key={meter.id}
                className={[
                  "size-2.5 rounded-full",
                  meter.isColored
                    ? getPriorityColor(note.priority)
                    : "bg-slate-400",
                ]
                  .filter(Boolean)
                  .join(" ")}
              ></div>
            ))}
          </div>
        </div>
        <p className="text-sm font-light text-default">{note.category.name}</p>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="absolute top-3 right-3"
            aria-label="Customise options"
          >
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                Set state as...
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuSubContent"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { state: "done" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Done
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { state: "inProgress" });
                    }}
                    className="DropdownMenuItem"
                  >
                    InProgress
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { state: "pending" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Pending
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { state: "canceled" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Canceled
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                Set Due date to...
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuSubContent"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "monday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Monday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "tuesday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Tuesday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "wednesday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Wednesday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "thursday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Thursday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "friday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Friday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "saturday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Saturday
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { due_date: "sunday" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Sunday
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                Set Priority as...
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuSubContent"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { priority: "low" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Low
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { priority: "medium" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Medium
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { priority: "high" });
                    }}
                    className="DropdownMenuItem"
                  >
                    High
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                Set Required effort to...
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuSubContent"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { effort: "easy" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Easy
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { effort: "moderate" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Moderate
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      eventEmitter.emit("note_update");
                      updateNote(note.id, { effort: "hard" });
                    }}
                    className="DropdownMenuItem"
                  >
                    Hard
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className="DropdownMenuSeparator" />

            <DropdownMenu.Item
              onClick={() => {
                eventEmitter.emit("note_update");
                deleteNote(note.id);
              }}
              className="text-red-500 text-xs leading-none rounded-sm focus:outline-none font-bold flex items-center h-6 p-2 relative select-none"
            >
              Delete
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="DropdownMenuArrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export default Note;
