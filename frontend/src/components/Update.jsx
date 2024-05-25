import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Todo, setTodo] = useState(0);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
//get single user data
    const getSingleUser = async () => {
        const response = await fetch(`http://localhost:5000/${id}`);
        const result = await response.json();
        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("");
            setName(result.name);
            setEmail(result.email);
            setTodo(result.Todo);
            console.log("Fetched user", result);
        }
    };


    useEffect(() => {
        getSingleUser();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTodoChange = (e) => {
        setTodo(e.target.value);
    };
//send updated data to backend 
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email, Todo };
        const response = await fetch(`http://localhost:5000/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        const result = await response.json();
        if (!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if (response.ok) {
            setError("");
            console.log("User updated", result);
            navigate(`/all`);
        }
    };

    return (
        <div className="container my-2">
            {error && <div className="alert alert-danger"> {error} </div>}
            <h1 className="h1 text-center">Edit the Todo details</h1>
            <form onSubmit={handleUpdate}>
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
                    <label className="form-label">Todo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={Todo}
                        onChange={handleTodoChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Update;
