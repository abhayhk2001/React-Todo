import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "./static/List.css";

function List(props) {
  const [todoList, setTodoList] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/all-tasks")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
    fetch(process.env.REACT_APP_API_URL + "/context")
      .then((response) => response.json())
      .then((data) => {
        var h = setOptions(data);
        console.log(h);
        console.log("hi");
        console.log(data);
      });
  }, []);
  const reRenderList = () => {
    fetch(process.env.REACT_APP_API_URL + "/all-tasks")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };
  const setEdit = (task) => props.setEdit(task);

  return (
    <div className="task-list">
      <h2 className="header">Task List</h2>
      {todoList.map((task, index) => {
        if (task.completed === false) {
          return (
            <div key={index}>
              <TaskCard
                key={index}
                task={task}
                contexts={options}
                reRender={reRenderList}
                setEdit={setEdit}
              />
            </div>
          );
        } else {
          return <div key={index}></div>;
        }
      })}
    </div>
  );
}

export default List;
