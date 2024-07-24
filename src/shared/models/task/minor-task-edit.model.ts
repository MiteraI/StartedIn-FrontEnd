export interface MinorTaskEditModel {
  taskTitle: string;
  description: string;
  status: number;
  majorTaskId: string | null;
}
