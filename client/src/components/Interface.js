import React, { useState, useEffect } from "react";
import InterfaceDataService from "../services/InterfaceService";

const Interface = props => {
  const initialInterfaceState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentInterface, setCurrentInterface] = useState(initialInterfaceState);
  const [message, setMessage] = useState("");

  const getInterface = id => {
    InterfaceDataService.get(id)
      .then(response => {
        setCurrentInterface(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInterface(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentInterface({ ...currentInterface, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentInterface.id,
      title: currentInterface.title,
      description: currentInterface.description,
      published: status
    };

    InterfaceDataService.update(currentInterface.id, data)
      .then(response => {
        setCurrentInterface({ ...currentInterface, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateInterface = () => {
    InterfaceDataService.update(currentInterface.id, currentInterface)
      .then(response => {
        console.log(response.data);
        setMessage("The interface was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteInterface = () => {
    InterfaceDataService.remove(currentInterface.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/interfaces");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentInterface ? (
        <div className="edit-form">
          <h4>Interface</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentInterface.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentInterface.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentInterface.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentInterface.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteInterface}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateInterface}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Interface...</p>
        </div>
      )}
    </div>
  );
};

export default Interface;