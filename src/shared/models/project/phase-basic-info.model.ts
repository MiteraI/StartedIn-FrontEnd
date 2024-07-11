import { MajorTaskBasicInfo } from "./major-task-basic-info.model";

export interface PhaseBasicInfo {
  id: string;
  name: string;
  position: number;
  tasks: MajorTaskBasicInfo[];
}
