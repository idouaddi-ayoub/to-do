import type { StateWithNotes } from "../types";
import Note from "./Note";

interface Props {
  state: StateWithNotes;
}

function StateContainer({ state }: Props) {
  return (
    <div
      key={state.name}
      className="w-[350px] rounded-xl p-3 flex flex-col gap-2 bg-tertiary"
    >
      <p className="text-[#2B1887] text-xl font-bold capitalize">
        {state.name}
      </p>
      {state.notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
}

export default StateContainer;
