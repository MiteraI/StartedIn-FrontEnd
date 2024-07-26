export interface MajorTaskEditModel {
  taskTitle: string;
  description: string;
  addMinorTaskIds: string[];
  removeMinorTaskId: string | null;
}
