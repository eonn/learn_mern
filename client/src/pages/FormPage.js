//import "./styles.css";
import React from 'react';
import { fields } from "./../components/data";
import { AddForm } from "./../components/AddForm";

export default function FormPage() {
  return (
    <div className="App">
      <h1>Dynamic form</h1>
      <AddForm fields={fields} />
    </div>
  );
}
