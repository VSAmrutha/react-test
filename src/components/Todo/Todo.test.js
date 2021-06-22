import Todo from "./Todo";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
afterEach(() => {
  cleanup();
});
test("should render non-completed todo component", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };

  render(<Todo todo={todo} />);
  const todoEl = screen.getByTestId("todo-1");
  expect(todoEl).toBeInTheDocument();
  expect(todoEl).toHaveTextContent(todo.title);
  expect(todoEl).not.toContainHTML("<strike>");
});
test("should render completed todo component", () => {
  const todo = { id: 2, title: "wash car", completed: true };

  render(<Todo todo={todo} />);
  const todoEl = screen.getByTestId(`todo-${todo.id}`);
  expect(todoEl).toBeInTheDocument();
  expect(todoEl).toHaveTextContent(todo.title);
  expect(todoEl.innerHTML.includes("<strike>")).toBeTruthy();
  //expect(todoEl).toContainHTML(`<strike><h1>${todo.title}</h1></strike>`);
});
test("matches snapshot", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };
  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
  //press "u" and enter the test running to update the snapshot
});
