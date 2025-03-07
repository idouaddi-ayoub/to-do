import { useMemo, useState } from "react";
import type {
  DueDate,
  Effort,
  GetNoteResponse,
  Note,
  Priority,
  State,
} from "../types";
import useAxios from "./useAxios";
import { AxiosResponse } from "axios";

type UpdateNote = {
  state?: State;
  priority?: Priority;
  effort?: Effort;
  due_date?: DueDate;
};

export default function useNotes() {
  const axios = useAxios();
  const [notes, setNotes] = useState<Note[]>([]);

  const stateWithNotes = useMemo(() => {
    const STATES: State[] = ["done", "inProgress", "pending", "canceled"];

    return STATES.map((state) => ({
      name: state,
      notes: notes.filter((note) => note.state === state),
    }));
  }, [notes]);

  async function getNotes() {
    try {
      const response: AxiosResponse<GetNoteResponse> = await axios.get("note");

      setNotes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateNote(noteId: number, newNoteData: UpdateNote) {
    try {
      await axios.put(`note/${noteId}`, newNoteData);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNote(noteId: number) {
    try {
      await axios.delete(`note/${noteId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return { notes, getNotes, stateWithNotes, updateNote, deleteNote };
}
