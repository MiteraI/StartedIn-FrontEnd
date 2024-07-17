import { MajorTaskBasicInfo } from "./major-task-basic-info.model";
import { MinorTaskBasicInfo } from "./minor-task-basic-info.model";

export interface MajorTaskDialogInfo {
  majorTask: MajorTaskBasicInfo;
  minorTasks: MinorTaskBasicInfo[];
}