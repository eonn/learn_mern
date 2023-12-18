import React, { useState } from "react";
import InterfaceDataService from "../services/InterfaceServices";

const AddInterface = () => {
  const initialInterfaceState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [Interface, setInterface] = useState(initialInterfaceState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInterface({ ...Interface, [name]: value });
  };

  const saveInterface = () => {
    var data = {
      title: Interface.title,
      description: Interface.description
    };

    InterfaceDataService.create(data)
      .then(response => {
        setInterface({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newInterface = () => {
    setInterface(initialInterfaceState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newInterface}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Interface.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Interface.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveInterface} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddInterface;