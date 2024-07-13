export interface CreateTeamRequest {
  team: {
    teamName: string;
    description: string;
  };
  project: {
    projectName: string;
  };
}
