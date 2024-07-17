import { PhaseListItem } from "./phase-list-item.model";
import { ProjectLeader } from "./project-leader.model";

export interface ProjectFullInfo {
  id: string;
  projectName: string;
  teamId: string;
  leader: ProjectLeader;
  phases: PhaseListItem[];
}
