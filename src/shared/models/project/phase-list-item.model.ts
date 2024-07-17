import { MajorTaskBasicInfo } from "../task/major-task-basic-info.model";

export interface PhaseListItem {
  id: string;
  phaseName: string;
  position: number;
  majorTasks: MajorTaskBasicInfo[];
}
