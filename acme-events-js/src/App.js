import React, { useState } from "react";
import moment from "moment";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "initial todo",
      date: moment("1/1/2020", "MM/DD/YYYY"),
      content: "hibbledy gibbledy",
      isHovered: false,
    },
  ]);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const _date = moment(dateInput, "MM/DD/YYYY");

  const onSubmit = (ev) => {
    ev.preventDefault();

    setTodos([
      ...todos,
      {
        title: titleInput,
        date: _date,
        content: contentInput,
        isHovered: false,
      },
    ]);
    setTitleInput("");
    setDateInput("");
    setContentInput("");
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-around">
        <form className="col-5 border border-dark m-2" onSubmit={onSubmit}>
          <label className="d-flex justify-content-center">Create To Do</label>
          <input
            type="text"
            name="date"
            className="row w-100 m-1"
            value={dateInput}
            placeholder="Due Date: eg. 01/01/2020"
            onChange={(ev) => setDateInput(ev.target.value)}
          />
          <input
            type="text"
            name="title"
            className="row w-100 m-1"
            value={titleInput}
            placeholder="Title: e.g. Get Swim Stuff"
            onChange={(ev) => setTitleInput(ev.target.value)}
          />
          <input
            type="text"
            name="content"
            className="row w-100 m-1"
            value={contentInput}
            placeholder="Content: e.g. Dick's has the goggles I want and Big 5 has the speedos"
            onChange={(ev) => setContentInput(ev.target.value)}
          />
          <div className="col text-center">
            <button
              type="submit"
              className="col text-center mt-2 mb-2"
              disabled={_date.isValid() ? false : true}
            >
              Submit
            </button>
          </div>
        </form>
        <ul className="col-5 border border-dark m-2 list-unstyled">
          {todos
            .sort((a, b) => {
              return a.date - b.date;
            })
            .map((todo, i) => {
              return (
                <li
                  key={i}
                  className={
                    todo.isHovered
                      ? "bg-info text-white w-100 text-center border border-dark mt-3 mb-3"
                      : "bg-light w-100 text-center border border-dark mt-3 mb-3"
                  }
                  onMouseEnter={() => {
                    setTodos(
                      todos.map((thing) => {
                        if (todo === thing) {
                          return { ...thing, isHovered: true };
                        } else {
                          return thing;
                        }
                      })
                    );
                  }}
                  onMouseLeave={() => {
                    setTodos(
                      todos.map((thing) => {
                        if (todo === thing) {
                          return { ...thing, isHovered: false };
                        } else {
                          return thing;
                        }
                      })
                    );
                  }}
                >
                  <div>{todo.title}</div>
                  <div>Due: {todo.date.format("MM/DD/YYYY")}</div>
                  <div>
                    <button type="button" className="close" aria-label="Close">
                      <span
                        aria-hidden="false"
                        onClick={() =>
                          setTodos(
                            todos.filter((_todo) => {
                              return _todo !== todo;
                            })
                          )
                        }
                      >
                        &times;
                      </span>
                    </button>
                  </div>
                  <div>{todo.content}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
