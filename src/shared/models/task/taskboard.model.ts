import { MiniTask } from "./mini-task.model";

export interface Taskboard {
  id: string;
  name: string;
  position: number;
  tasks: MiniTask[];
}
