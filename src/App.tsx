import { useEffect, useState } from "react";
import useNotes from "./hooks/useNotes";
import StateContainer from "./components/StateContainer";
import CreateNote from "./components/CreateNote";
import { PlusIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import useEventEmitter from "./hooks/useEventEmitter";

function App() {
  const eventEmitter = useEventEmitter();
  const { getNotes, stateWithNotes } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getNotes();

    eventEmitter.on("note_update", () => {
      setTimeout(() => {
        getNotes();
      }, 500);
    });

    return () => {
      eventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap justify-center gap-12 bg-default p-20 overflow-auto relative">
      {stateWithNotes.map((state) => (
        <StateContainer state={state} key={state.name} />
      ))}

      <button className="absolute z-50 cursor-default bottom-10 right-10 flex items-start justify-center bg-white rounded-full p-2">
        <PlusIcon onClick={() => setIsOpen(true)} className="size-10" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader className="text-start">
            <DialogTitle className="mt-[-10px] flex items-baseline space-x-2">
              <UpdateIcon />
              <p>Create new note</p>
            </DialogTitle>
            <DialogDescription className="ml-7">
              create your{" "}
              <span className="cursor-pointer underline">notes here</span>
            </DialogDescription>
          </DialogHeader>

          <CreateNote />

          <DialogFooter>
            <DialogClose className="opacity-0 pointer-events-none">
              Create
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
