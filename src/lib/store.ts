import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Column } from "@/app/admin/dashboard/drive/_components/board-column";

export type Status = "not_required" | "required";

const defaultCols = [
  {
    title: "All Student Data" as const,
    id: "all",
  },
  {
    title: "Required Student Data" as const,
    id: "required",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

export type StudentAttribute = {
  id: string;
  title: string;
  label?: string;
  status: Status;
};

export type State = {
  tasks: StudentAttribute[];
  columns: Column[];
  draggedTask: string | null;
};

const StudentColumns: StudentAttribute[] = [
  {
    id: "name",
    status: "required",
    title: "Name",
  },
  {
    id: "phone_number",
    status: "required",
    title: "Phone Number",
  },
  {
    id: "email",
    status: "required",
    title: "Email",
  },
  {
    id: "gender",
    status: "not_required",
    title: "Gender",
  },
  {
    id: "branch",
    status: "required",
    title: "Branch",
  },
  {
    id: "rollnum",
    status: "required",
    title: "Roll Number",
  },
  {
    id: "student_type",
    status: "not_required",
    title: "Student Type",
  },
  {
    id: "cgpa",
    status: "required",
    title: "CGPA",
  },
  {
    id: "marks10th",
    status: "not_required",
    title: "Percentage 10th",
  },
  {
    id: "marks12th",
    status: "not_required",
    title: "Percentage 12th",
  },
  {
    id: "has_backlogs",
    status: "required",
    title: "Any Backlogs?",
  },

];

export type Actions = {
  addTask: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: StudentAttribute[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: StudentColumns,
      columns: defaultCols,
      draggedTask: null,
      addTask: (title: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, status: "not_required" },
          ],
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          ),
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            {
              title,
              id: state.columns.length ? title.toUpperCase() : "not_required",
            },
          ],
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
        })),
      setTasks: (newTasks: StudentAttribute[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
    }),
    { name: "task-store", skipHydration: true }
  )
);
