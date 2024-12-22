// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { data } from "./data";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [loading, setLoading] = useState(true);

  const [newTodo, setNewTodo] = useState(""); // For adding new items
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [editingId, setEditingId] = useState(null); // For editing items
  const [editingTitle, setEditingTitle] = useState(""); // For the edit input

  // Load initial data
  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let updatedItems = items;

    // Filter by completion status
    if (filterCompleted !== "") {
      updatedItems = updatedItems.filter(
        (item) => item.completed === (filterCompleted === "true")
      );
    }

    // Search by title
    if (searchTerm.trim() !== "") {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
    setCurrentPage(0); // Reset to first page on new filter/search
  }, [searchTerm, filterCompleted, items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Add new item
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newItem = {
        userId: 1,
        id: items.length + 1,
        title: newTodo,
        completed: false,
      };
      setItems((prev) => [newItem, ...prev]);
      setNewTodo("");
      setIsModalOpen(false); // Close modal after adding
    }
  };

  // Delete an item
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Edit an item
  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, title: editingTitle } : item
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle completion status
  const toggleCompletion = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
        <div className="box">
        <div className="text">
        <h4>Halftime</h4> 
        <small>..helping you focus on important events..</small>
        </div>
        <div className="flexing">
          <a
            href="/ErrorPage"
            className="404">
           <p>404 Page</p> 
          </a>
          <a
            href="/ErrorBoundary"
            className="error">
              <p>Error Boundary</p>
          </a>
        </div>
      </div>

      {/* Add New Todo Button */}
      <div className="new-task">
        <button onClick={() => setIsModalOpen(true)} className="text-1xl">
          Create <em>+</em>
        </button>
      </div>

      {/* Modal for Adding New Todo */}
      {isModalOpen && (
        <div className="pop-up"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "beige",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}>
          <h2>Add New Task to Solve</h2>
          <input
            type="text"
            placeholder="Enter to-do title..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginBottom: "10px", display: "block" }}
          />
          <button onClick={handleAddTodo} style={{ marginRight: "10px" }}>
            Add
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="search">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sea"
        />
        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="filt">
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>

      {/* Items List */}
      <div className="mt-10">
        {loading ? (
          <div>Loading...</div>
        ) : currentItems.length > 0 ? (
          
          currentItems.map((item) => (
            <div key={item.id} className="mt-5">
              {editingId === item.id ? (
                <div className="searching">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border"
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="content">
                  <div className="sub-content">
                  <h3> <Link to={`/todo/${item.id}`}>{item.title}</Link></h3> 
                  <p>{item.completed ? "Completed" : "Not Completed"}</p>
                  </div>
                  <button onClick={() => toggleCompletion(item.id)} className="marked">
                    {item.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  </button>
                  <button onClick={() => handleEdit(item.id, item.title)} className="edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="delet">Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No items found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredItems.length > itemsPerPage && (
        <div className="last">
          <button onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}>
            Next
          </button>
          <p>
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
