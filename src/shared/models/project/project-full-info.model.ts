import { PhaseBasicInfo } from "./phase-basic-info.model";

export interface ProjectFullInfo {
  id: string;
  projectName: string;
  teamId: string;
  creator: string;
  phases: PhaseBasicInfo[];
}
