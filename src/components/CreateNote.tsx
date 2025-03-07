import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useCategories from "../hooks/useCategories";
import { DueDate, Effort, Priority, State } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";
import useEventEmitter from "../hooks/useEventEmitter";

interface FormState {
  name: string;
  description: string;
  categoryId: number;
  state: State;
  dueDate: DueDate;
  effort: Effort;
  priority: Priority;
}

const STATES: State[] = ["canceled", "done", "inProgress", "pending"];
const DUE_DATES: DueDate[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const PRIORITIES: Priority[] = ["high", "low", "medium"];
const EFFORTS: Effort[] = ["moderate", "easy", "hard"];

function CreatedNote() {
  const eventEmitter = useEventEmitter();
  const axios = useAxios();
  const { categories, getCategories } = useCategories();
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const formattedData = {
      name: data.name,
      description: data.description,
      state: data.state,
      effort: data.effort,
      priority: data.priority,
      due_date: data.dueDate,
      category: {
        connect: {
          id: Number(data.categoryId),
        },
      },
    };
    try {
      await axios.post("note", formattedData);
    } catch (error) {
      console.error(error);
    }
    eventEmitter.emit("note_update");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form
      className="flex justify-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-end justify-between gap-3">
        <label htmlFor="name">Name</label>
        <label htmlFor="description">Description</label>
        <label htmlFor="categoryId">Category</label>
        <label htmlFor="state">State</label>
        <label htmlFor="due_date">Due date</label>
        <label htmlFor="priority">Priority</label>
        <label htmlFor="effort">Required effort</label>
      </div>
      <div className="flex h-full flex-col gap-3 flex-1">
        <input
          className="border rounded-sm"
          id="name"
          {...register("name", { required: true })}
        />
        <input
          className="border rounded-sm"
          id="description"
          {...register("description", { required: true })}
        />
        <select
          {...register("categoryId")}
          className="border rounded-sm capitalize"
          name="categoryId"
          id="categoryId"
        >
          {categories.map((categoryId) => (
            <option
              key={categoryId.name}
              className="capitalize"
              value={categoryId.id}
            >
              {categoryId.name}
            </option>
          ))}
        </select>
        <select
          {...register("state")}
          className="border rounded-sm capitalize"
          name="state"
          id="state"
        >
          {STATES.map((state) => (
            <option key={state} className="capitalize" value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          {...register("dueDate")}
          className="border rounded-sm capitalize"
          name="due_date"
          id="due_date"
        >
          {DUE_DATES.map((due_date) => (
            <option key={due_date} className="capitalize" value={due_date}>
              {due_date}
            </option>
          ))}
        </select>
        <select
          {...register("effort")}
          className="border rounded-sm capitalize"
          name="effort"
          id="effort"
        >
          {EFFORTS.map((effort) => (
            <option key={effort} className="capitalize" value={effort}>
              {effort}
            </option>
          ))}
        </select>
        <select
          {...register("priority")}
          className="border rounded-sm capitalize"
          name="priority"
          id="priority"
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} className="capitalize" value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <input
        className="cursor-pointer absolute right-6 bottom-5"
        type="submit"
      />
    </form>
  );
}

export default CreatedNote;
