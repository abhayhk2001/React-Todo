import React from "react";
import "./static/TaskCard.css";

function TaskCard(props) {
  return (
    <div className="task-card">
      <h2>{props.task.title}</h2>
    </div>
  );
}

export default TaskCard;
