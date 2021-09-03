import React, { useState } from "react";
import Form from "./Form";
import EditForm from "./EditForm";
import List from "./List";
import "./static/Home.css";

function Home() {
  const [listchanged, setListChanged] = useState(false);
  const [renderEditFrom, setRender] = useState(0);
  const [editVals, setEditVals] = useState({
    edit: false,
  });

  function reRenderList() {
    setListChanged(!listchanged);
  }
  function reRenderEditList() {
    setListChanged(!listchanged);
    setEditVals({
      edit: false,
    });
  }

  function setEdit(task) {
    console.log(task);
    setEditVals({
      edit: true,
      id: task.id,
      title: task.title,
      recurring: task.recurring,
      context: task.contexts,
    });
    setRender(1);
  }
  return (
    <>
      <div className="heading">
        <h1 className="main-heading">Welcome to Task Manager</h1>
      </div>
      <List key={listchanged} setEdit={setEdit} />
      {editVals.edit ? (
        <EditForm
          key={renderEditFrom}
          reRenderEditList={reRenderEditList}
          editVals={editVals}
        />
      ) : (
        <Form reRenderList={reRenderList} />
      )}
    </>
  );
}

export default Home;
