import { MinorTask } from "./minor-task.model";

export interface Taskboard {
  id: string;
  title: string;
  position: number;
  phaseId: string;
  minorTasks: MinorTask[];
}
