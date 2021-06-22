import React from "react";
import Counter from "./Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
let getByTestId;
beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});
afterEach(() => {
  cleanup();
});
// afterAll(()=>{

// })
test("Header renders with correct test", () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});
test("counter initially starts at 0", () => {
  const counterId = getByTestId("counter");
  expect(counterId.textContent).toBe("0");
});
test("input contains initial value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});
test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});
test("sub button renders with -", () => {
  const subBtn = getByTestId("sub-btn");
  expect(subBtn.textContent).toBe("-");
});
test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  expect(inputEl.value).toBe("5");
});
test("click on add button adds 1 to counter", () => {
  const addBtn = getByTestId("add-btn");
  const counterId = getByTestId("counter");
  expect(counterId.textContent).toBe("0");
  fireEvent.click(addBtn);
  expect(counterId.textContent).toBe("1");
});
test("click on sub button sub 1 to counter", () => {
  const subBtn = getByTestId("sub-btn");
  const counterId = getByTestId("counter");
  expect(counterId.textContent).toBe("0");
  fireEvent.click(subBtn);
  expect(counterId.textContent).toBe("-1");
});
test(" changing input value then clicking on add button works correctly", () => {
  const addBtn = getByTestId("add-btn");
  const counterId = getByTestId("counter");

  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  fireEvent.click(addBtn);
  expect(counterId.textContent).toBe("5");
});
test("changing input value then clicking on sub button works correctly", () => {
  const subBtn = getByTestId("sub-btn");
  const counterId = getByTestId("counter");

  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  fireEvent.click(subBtn);
  expect(counterId.textContent).toBe("-5");
});
test("adding and then subtracting leads to the correct counter number", () => {
  const addBtn = getByTestId("add-btn");
  const subBtn = getByTestId("sub-btn");
  const counterId = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(addBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  expect(counterId.textContent).toBe("20");
  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  fireEvent.click(addBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  expect(counterId.textContent).toBe("15");
});
test("counter contains correct class name", () => {
  const counterId = getByTestId("counter");
  const inputEl = getByTestId("input");
  const addBtn = getByTestId("add-btn");
  const subBtn = getByTestId("sub-btn");
  expect(counterId.className).toBe("");
  fireEvent.change(inputEl, {
    target: {
      value: "50",
    },
  });
  expect(counterId.className).toBe("");
  fireEvent.click(addBtn);
  fireEvent.click(addBtn); //100

  expect(counterId.className).toBe("green");
  fireEvent.click(addBtn); //150

  expect(counterId.className).toBe("green");

  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn); //0

  expect(counterId.className).toBe("");
  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn); //-150
  expect(counterId.className).toBe("red");
});
