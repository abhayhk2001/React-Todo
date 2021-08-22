import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "./static/List.css";

function List() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/all-tasks")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, []);
  return (
    <div className="task-list">
      <h2 className="header">Task List</h2>
      {todoList.map((task, index) => {
        return (
          <div key={index}>
            <TaskCard task={task} />
          </div>
        );
      })}
    </div>
  );
}

export default List;
