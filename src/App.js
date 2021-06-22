import React, { useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import Posts from "./components/Posts/Posts";
// import Todo from "./components/Todo/Todo";
function App() {
  // const todos = [
  //   { id: 1, title: "wash dishes", completed: false },
  //   { id: 2, title: "make dinner", completed: true },
  // ];
  const [display, setDisplay] = useState("1");
  const displayHandler = (val) => {
    setDisplay(val);
  };
  return (
    <div className="app">
      {/* {todos.map((todo) => {
        return <Todo todo={todo} />;
      })} */}
      <div className="tabs">
        <button
          className="generic-btn button-primary"
          onClick={() => displayHandler("1")}
        >
          Posts
        </button>
        <button
          className="generic-btn button-secondary"
          onClick={() => displayHandler("2")}
        >
          Counter
        </button>
      </div>
      {display === "1" && <Posts />}
      {display === "2" && <Counter />}
    </div>
  );
}

export default App;
