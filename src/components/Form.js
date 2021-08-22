import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

function Form(props) {
  const [task, setTask] = useState("");
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_URL + "/add-task/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: task,
        completed: false,
        recurring: false,
        contexts: selected.map((value, index) => {
          return value.id;
        }),
      }),
    }).then(() => {
      props.reRenderList();
      setSelected([]);
      setTask("");
    });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/context")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      });
  }, []);
  const onSelect = (selectedList, selectedItem) => setSelected(selectedList);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          value={task}
          onChange={(e) => {
            e.preventDefault();
            setTask(e.target.value);
          }}
        />
        <Multiselect
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
