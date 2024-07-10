import { ProjectBasicInfo } from "./project-basic-info.model";

export interface ProjectTeam {
  id: string;
  teamName: string;
  description: string;
  projects: ProjectBasicInfo[];
}
