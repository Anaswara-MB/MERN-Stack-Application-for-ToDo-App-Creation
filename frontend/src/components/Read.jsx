import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // State for filter criteria

  async function getData(filter = "all") {
    let url = "http://localhost:5000";
    if (filter === "completed") {
      url += "?status=completed";
    } else if (filter === "incomplete") {
      url += "?status=incomplete";
    }

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData(filter);
      }, 2000);
    }
  };

  useEffect(() => {
    getData(filter);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  console.log(data);

  return (
    <div className="container my-2">
      <h2 className="text-center">All the Todo tasks</h2>
      <h6>Delete Option must be present against each task</h6>
      <h6>Filter option must be there to view all tasks, to view completed tasks and to view incomplete tasks. Delete Option is present against each task</h6>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary mx-2" onClick={() => handleFilterChange("all")}>All</button>
        <button className="btn btn-success mx-2" onClick={() => handleFilterChange("completed")}>Completed</button>
        <button className="btn btn-warning mx-2" onClick={() => handleFilterChange("incomplete")}>Incomplete</button>
      </div>
      <div className="row">
        {data.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <h6 className="card-text">{ele.Todo}</h6>
                <h6 className="card-text">{ele.status}</h6> {/* Assuming there's a 'status' field */}
                <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </a>
                <Link to={`/${ele._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
