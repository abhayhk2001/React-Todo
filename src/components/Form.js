import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import "./static/Form.css";

function Form(props) {
  const [task, setTask] = useState("");
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [recur, setRecur] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://abhayhk.pythonanywhere.com/api/add-task/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: task,
        completed: false,
        recurring: recur,
        contexts: selected.map((value, index) => {
          return value.id;
        }),
      }),
    }).then(() => {
      props.reRenderList();
      setSelected([]);
      setRecur(false);
      setTask("");
    });
  };

  useEffect(() => {
    fetch("http://abhayhk.pythonanywhere.com/api/context")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      });
    return () => {
      setTask("");
      setSelected([]);
      setOptions([]);
      setRecur(false);
    };
  }, []);
  const onSelect = (selectedList, selectedItem) => setSelected(selectedList);
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          className="task-name"
          value={task}
          onChange={(e) => {
            e.preventDefault();
            setTask(e.target.value);
          }}
        />
        <span className="recurring">Recurring</span>
        <div className="switch">
          <input
            type="checkbox"
            value={recur}
            onChange={() => {
              console.log({ recur });
              setRecur(!recur);
            }}
          />
          <span className="slider round"></span>
        </div>
        <Multiselect
          className="context-select"
          options={options}
          selectedValues={selected}
          onSelect={onSelect}
          displayValue="name"
        />
        <input type="submit" value="Add Task" />
      </form>
    </>
  );
}

export default Form;
