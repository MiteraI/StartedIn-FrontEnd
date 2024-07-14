import { Taskboard } from "../task/taskboard.model";

export interface PhaseFullInfo {
  id: string;
  phaseName: string;
  projectId: string;
  taskboards: Taskboard[];
}
