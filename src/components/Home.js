import React, { useState } from "react";
import Form from "./Form";
import List from "./List";
import "./static/Home.css";

function Home() {
  const [listchanged, setListChanged] = useState(false);
  function reRenderList() {
    setListChanged(true);
  }
  return (
    <>
      <div className="heading">
        <h1 className="main-heading">Welcome to Task Manager</h1>
      </div>
      <List key={listchanged} />
      <Form reRenderList={reRenderList} />
    </>
  );
}

export default Home;
