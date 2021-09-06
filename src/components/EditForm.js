import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import "./static/Form.css";

function EditForm(props) {
  const [task, setTask] = useState(props.editVals.title);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [recur, setRecur] = useState(props.editVals.recurring);
  const [comp, setComp] = useState(props.editVals.completed);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task, selected, recur);
    fetch(
      "http://abhayhk.pythonanywhere.com/api/update-task/" +
        props.editVals.id +
        "/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: task,
          completed: comp,
          recurring: recur,
          contexts: selected.map((value, index) => {
            return value.id;
          }),
        }),
      }
    ).then(() => {
      props.reRenderEditList();
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
        console.log(data);
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
        <div className="switch">
          <span className="recurring">Recurring</span>
          <input
            type="checkbox"
            value={recur}
            onChange={() => {
              setRecur(!recur);
            }}
          />
        </div>
        <div className="switch">
          <span className="recurring">Completed</span>
          <input
            type="checkbox"
            value={recur}
            onChange={() => {
              setComp(!comp);
            }}
          />
        </div>
        <Multiselect
          className="context-select"
          options={options}
          selectedValues={selected}
          onSelect={onSelect}
          displayValue="name"
        />
        <input type="submit" value="Edit Task" />
      </form>
    </>
  );
}

export default EditForm;
