import { ProjectBasicInfo } from '../project-basic-info.model';

export interface TeamProjectDetails {
  id: string;
  teamName: string;
  description: string;
  createdTime: Date;
  createdBy: string;
  users: string[];
  projects: ProjectBasicInfo[];
}
