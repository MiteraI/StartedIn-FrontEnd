import { MajorTaskBasicInfo } from "./major-task-basic-info.model";
import { MinorTask } from "./minor-task.model";

export interface MajorTaskDialogInfo {
  majorTask: MajorTaskBasicInfo;
  minorTasks: MinorTask[];
}
