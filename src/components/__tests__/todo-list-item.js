import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoItem from "../todo-list-item";

const mockedTodo = {
  id: "1234",
  content: "grocery",
  completed: false,
};

const markCompleted = jest.fn();
const deleteTodo = jest.fn();

test('Todo list item not to be rendered when todo prop has value null', () => {
  render(<TodoItem todo={null} />);
  expect(screen.queryByTestId('todo-list-item')).not.toBeInTheDocument();
});

let renderUtils;

describe('Todo List Item', () => {
  beforeEach(() => {
    renderUtils = render(
      <TodoItem 
        todo={mockedTodo} 
        markCompleted={markCompleted} 
        deleteTodo={deleteTodo} 
      />)
  });

  afterEach(() => {
    markCompleted.mockClear();
    deleteTodo.mockClear();
  });

  test("Todo is marked completed on checkbox click", () => {
    const { rerender, getByLabelText, getByTestId } = renderUtils;
    const checkbox = getByLabelText(mockedTodo.content);
    fireEvent.click(checkbox);

    expect(markCompleted).toHaveBeenCalledTimes(1);
    expect(markCompleted).toHaveBeenCalledWith(mockedTodo.id);
    expect(checkbox).toBeChecked();

    rerender(<TodoItem todo={{ ...mockedTodo, completed: true }} />)
    expect(getByTestId('todo-row')).toHaveClass('checked');
  });

  test("Todo item to be deleted on click of delete button", () => {
    const deleteBtn = screen.getByTestId("delete-btn");
    fireEvent.click(deleteBtn);
  
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith("1234");
  });
})