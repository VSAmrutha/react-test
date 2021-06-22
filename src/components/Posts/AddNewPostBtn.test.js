import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import AddNewPostBtn from "./AddNewPostBtn.js";
describe("add new post", () => {
  test("button onclick is trigger the callback ", () => {
    const onClickCallBack = jest.fn();
    render(<AddNewPostBtn onClick={onClickCallBack} />);
    fireEvent.click(screen.getByText("Add New Post"));
    expect(onClickCallBack).toHaveBeenCalled();
  });
});
