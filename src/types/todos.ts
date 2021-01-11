export type Task = {
  id: string;
  taskText: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskCreatePayload = {
  taskText: string;
};

export type TaskEditPayload = {
  id: string;
  taskText?: string;
  isDone?: boolean;
};
