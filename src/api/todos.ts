import { Task, TaskCreatePayload, TaskEditPayload } from '../types/todos';

const TODOS_URL = 'http://localhost/3000/api/tasks';

export const getTasks: () => Promise<Array<Task>> = async (): Promise<Array<Task>> => {
  try {
    const response = await fetch(TODOS_URL);
    if (response.ok) return await response.json();
    else await Promise.reject(response);
  } catch (error) {
    const httpStatusCode = error.status;
    if (httpStatusCode === 404 || httpStatusCode === 500) console.log(error.message);
    else console.log(`Error occurred while fetching todos: HTTP ${httpStatusCode}`);
  }
};

export const getTaskById: (id: string) => Promise<Task> = async (id: string) => {
  try {
    const response = await fetch(`${TODOS_URL}/${id}`);
    if (response.ok) return await response.json();
    else await Promise.reject(response);
  } catch (error) {
    const httpStatusCode = error.status;
    if (httpStatusCode === 404 || httpStatusCode === 500) console.log(error.message);
    else console.log(`Error occurred while fetch task with id ${id}: HTTP ${httpStatusCode}`);
  }
};

export const createTask: (taskPayload: TaskCreatePayload) => Promise<string> = async (
  taskPayload: TaskCreatePayload,
): Promise<string> => {
  try {
    const response = await fetch(TODOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskPayload),
    });
    if (response.ok) {
      const responseContent = await response.json();
      return responseContent.id;
    } else await Promise.reject(response);
  } catch (error) {
    const httpStatusCode = error.status;
    if (httpStatusCode === 404 || httpStatusCode === 500) console.log(error.message);
    else console.log(`Error occurred while creating task: HTTP ${httpStatusCode}`);
  }
};

export const editTask = async (taskPayload: TaskEditPayload) => {
  try {
    const response = await fetch(`${TODOS_URL}/${taskPayload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskText: taskPayload.taskText,
        isDone: taskPayload.isDone,
      }),
    });
    if (response.ok) return response;
    else await Promise.reject(response);
  } catch (error) {
    const httpStatusCode = error.status;
    if (httpStatusCode === 404 || httpStatusCode === 500) console.log(error.message);
    else console.log(`Error occurred while editing task with id: ${taskPayload.id}`);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`${TODOS_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (response.ok) return response;
    else await Promise.reject(response);
  } catch (error) {
    const httpStatusCode = error.status;
    if (httpStatusCode === 404 || httpStatusCode === 500) console.log(error.message);
    else console.log(`Error occurred while deleting task with id: ${taskId}`);
  }
};
