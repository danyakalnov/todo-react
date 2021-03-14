import React from 'react';
import { render, cleanup, fireEvent, screen, act, waitFor } from '@testing-library/react';

import { CreateTodoItem } from '../src/components/CreateTodoItem';
import { getTasks, createTask } from '../src/api/todos';
import { TodoList } from '../src/components/TodoList';

jest.mock('../src/api/todos.ts', () => {
  return {
    createTask: jest.fn().mockImplementation(() => {
      return '1';
    }),
    getTasks: jest.fn(),
  };
});

describe('CreateTodoItem', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    jest.unmock('../src/api.todos.ts');
  });

  test('Should call POST "/create" and then GET "/" methods', async () => {
    const setTasks = jest.fn();
    render(<CreateTodoItem setTasks={setTasks} />);

    const newTodoText = 'Покормить кошку';

    // Find input field and enter new task's text
    const inputField = screen.getByLabelText(/Новое задание/i);

    act(() => {
      fireEvent.change(inputField, { target: { value: newTodoText } });
    });

    // Find submit button and click it
    const submitButton = screen.getByRole('button');
    act(() => {
      fireEvent.click(submitButton);
    });

    getTasks.mockReturnValueOnce([
      {
        id: 1,
        taskText: newTodoText,
        isDone: false,
        createdAt: Date.now(),
        updatedAt: null,
      },
    ]);

    await waitFor(() => {
      expect(getTasks).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(createTask).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith({ taskText: newTodoText });
    });
  });

  test('Should clear input field after click on add button', async () => {
    const setTasks = jest.fn();
    render(<CreateTodoItem setTasks={setTasks} />);

    const newTodoText = 'todo';

    // Find input field and enter new task's text
    const inputField = screen.getByLabelText(/Новое задание/i);

    act(() => {
      fireEvent.change(inputField, { target: { value: newTodoText } });
    });

    // Expect input field value to be the value of new to-do's text
    await waitFor(() => {
      expect(inputField.value).toBe(newTodoText);
    });

    // Find submit button and click it
    const submitButton = screen.getByRole('button');
    act(() => {
      fireEvent.click(submitButton);
    });

    // After the submit is happened, empty string value should be set to input field
    await waitFor(() => {
      expect(inputField.value).toBe('');
    });
  });

  test('Should preserve input field text if fetching failed', async () => {
    const setTasks = jest.fn();
    render(<CreateTodoItem setTasks={setTasks} />);

    const newTodoText = 'todo';

    // Find input field and enter new task's text
    const inputField = screen.getByLabelText(/Новое задание/i);

    act(() => {
      fireEvent.change(inputField, { target: { value: newTodoText } });
    });

    createTask.mockImplementationOnce(() => {
      return Promise.reject({ error: 'Error while creating new task' });
    });

    // Find submit button and click it
    const submitButton = screen.getByRole('button');
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(inputField.value).toBe(newTodoText);
    });

    await waitFor(() => {
      expect(screen.findByText(/ошибка/i)).not.toBeNull();
    });
  });

  /* Integration test with TodoList component */
  test('Should add new to-do to list after creating new to-do', async () => {
    // Check interaction with TodoList parent container
    render(<TodoList />);

    const newTodoText = 'Покормить кошку';

    getTasks
      .mockImplementationOnce(() => [])
      .mockImplementationOnce(() => [
        {
          id: 1,
          taskText: newTodoText,
          isDone: false,
          createdAt: Date.now(),
          updatedAt: null,
        },
      ]);

    // Find input field and enter new task's text
    const inputField = screen.getByLabelText(/Новое задание/i);

    act(() => {
      fireEvent.change(inputField, { target: { value: newTodoText } });
    });

    // Find submit button and click it
    const submitButton = screen.getByRole('button');
    act(() => {
      fireEvent.click(submitButton);
    });

    const newTask = await screen.findByText(newTodoText);

    await waitFor(() => {
      expect(newTask).not.toBeNull() && expect(inputField.value).toBe('');
    });
  });
});
