// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { data } from "./data"; // Assuming the same data source as in TodoList

const TodoDetails = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const navigate = useNavigate(); // For navigating back to the todo list

  // Find the todo item by ID
  const todo = data.find((item) => item.id === parseInt(id));

  if (!todo) {
    return (
      <div className="container">
        <h2>Todo not found!</h2>
        <button onClick={() => navigate(-1)}>Back to Todo List</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Todo Details</h2>
        <button onClick={() => navigate(-1)}>Back to Todo List</button>
      </div>
      <div className="content">
        <h3>{todo.title}</h3>
        <p>
          <strong>Status:</strong>{" "}
          {todo.completed ? "Completed" : "Not Completed"}
        </p>
        <p>
          <strong>ID:</strong> {todo.id}
        </p>
        <p>
          <strong>User ID:</strong> {todo.userId}
        </p>
      </div>
    </div>
  );
};

export default TodoDetails;
