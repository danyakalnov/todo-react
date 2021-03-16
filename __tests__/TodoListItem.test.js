import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  screen,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { getTasks, deleteTask } from '../src/api/todos';

import { TodoList } from '../src/components/TodoList';

jest.mock('../src/api/todos.ts', () => {
  return {
    getTasks: jest.fn(),
    deleteTask: jest.fn(),
  };
});

describe('TodoListItem', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    jest.unmock('../src/api/todos.ts');
  });

  /* Integration test */
  test('Todo item should disappear from todo list after deleting', async () => {
    const todoText = 'Some text';
    getTasks.mockImplementationOnce(() => [
      {
        id: 1,
        taskText: todoText,
        isDone: false,
        createdAt: Date.now(),
        updatedAt: null,
      },
    ]);

    await waitFor(() => {
      render(<TodoList />);
    });

    // Find task on the screen
    let todoItem = screen.queryByText(todoText);

    // Task should be on the screen for now
    expect(todoItem).not.toBeNull();

    // Find delete icon on the task item
    const deleteIcon = screen.getByRole('button', {
      name: 'delete-todo',
    });

    // Mock API functions for deleting step
    getTasks.mockImplementationOnce(() => []);
    deleteTask.mockResolvedValueOnce(true);

    // Act - deleting the task
    act(() => {
      fireEvent.click(deleteIcon);
    });

    // Assert that task is no longer present in the document
    waitForElementToBeRemoved(todoItem).then(() => {
      expect(todoItem).not.toBeInTheDocument();
    });
  });
});
