export type State = "done" | "pending" | "canceled" | "inProgress";

export type Priority = "low" | "medium" | "high";

export type Effort = "easy" | "moderate" | "hard";

export type DueDate =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Note {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  state: State;
  priority: Priority;
  effort: Effort;
  due_date: DueDate;
  category: Category;
  created_at: string;
  updated_at: string;
}

export type Category = {
  id: number;
  name: string;
  color: string;
  updated_at: string;
};

export interface StateWithNotes {
  name: string;
  notes: Note[];
}

export interface GetNoteResponse {
  message: string;
  data: Note[];
}

export interface GetCategoryResponse {
  message: string;
  data: Category[];
}
