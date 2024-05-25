import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Todo, setTodo] = useState("");
  const [status, setStatus] = useState("ongoing"); // Default status to "ongoing"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, Todo, status };

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        console.log(result);
        setError("");
        setName("");
        setEmail("");
        setTodo("");
        setStatus("ongoing");
        navigate("/all");
      }
    } catch (err) {
      console.error("Failed to fetch", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      <h5>MERN Stack Application for ToDo App Creation.</h5>
      <h6>In this app we can add the Todo details and edit the Todo details and edit the Todo details.Upon clicking on the Add button, able to add a ToDo Description and its status(completed, ongoing) </h6>
      <h1 className="h1 text-center">Enter the ToDo List details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"> Todo List Description</label>
          <input
            type="text"
            className="form-control"
            value={Todo}
            onChange={handleTodoChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-control" value={status} onChange={handleStatusChange}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default Create;
