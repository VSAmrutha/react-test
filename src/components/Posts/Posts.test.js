import Posts from "./Posts.js";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
// import { act } from "react-dom/test-utils";

const mockPostData = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

const data = {
  userId: 1,
  id: 3,
  title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
};

describe("Posts", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      if (options?.method == "POST") {
        return Promise.resolve({
          json: () => Promise.resolve(data),
        });
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostData),
        });
      }
    });
  });
  test("fetch and render posts", async () => {
    //********another way */
    // await act(async () => render(<Posts />));
    // mockPostData.forEach((post) =>
    //   expect(screen.getByText(post.title)).toBeInTheDocument()
    // );
    render(<Posts />);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
    await waitFor(() =>
      mockPostData.forEach((post) =>
        expect(screen.getByText(post.title)).toBeInTheDocument()
      )
    );
  });
  test("click on cancel button should hide the form and reset the input details", async () => {
    render(<Posts />);
    await waitFor(() => fireEvent.click(screen.getByText("Add New Post")));
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: {
        value: "post new",
      },
    });
    expect(screen.queryByPlaceholderText("Title").value).toBe("post new");
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Add New Post"));
    expect(screen.queryByPlaceholderText("Title").value).toBe("");
  });
  test("create new post,render a post and submit the form", async () => {
    render(<Posts />);
    //opening the form
    await waitFor(() => fireEvent.click(screen.getByText("Add New Post")));

    const titleInputEl = screen.getByPlaceholderText("Title");
    const bodyInputEl = screen.getByPlaceholderText("Body");
    const submitBtnEl = screen.getByRole("button", { name: "Submit" });
    expect(titleInputEl.value).toBe("");
    expect(bodyInputEl.value).toBe("");
    expect(submitBtnEl).toBeInTheDocument();

    //start typing
    fireEvent.change(titleInputEl, {
      target: {
        value: data.title,
      },
    });
    fireEvent.change(bodyInputEl, {
      target: {
        value: data.body,
      },
    });
    //submit the form
    //as submit is doing fetch, we need to use wait for
    await waitFor(() => fireEvent.click(submitBtnEl));
    expect(titleInputEl).not.toBeInTheDocument();
    expect(bodyInputEl).not.toBeInTheDocument();
    // new post should exists in the screen
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(/et iusto sed quo iure/)).toBeInTheDocument();
  });
});
