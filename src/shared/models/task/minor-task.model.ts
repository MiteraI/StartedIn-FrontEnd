export interface MinorTask {
  id: string;
  taskTitle: string;
  description: string;
  status: number;
  position: number;
  majorTaskId: string | null;
}
