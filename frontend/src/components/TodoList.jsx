import { useState } from "react";
import axios from "axios";

function TodoList({ todos, fetchTodos }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/api/todos/${id}`, { status });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const saveEdit = async (id) => {
    await axios.put(`/api/todos/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditId(null);
    fetchTodos();
  };

  return (
    <div className="list">
      {todos.map((todo) => (
        <div key={todo._id} className="card">
          {editId === todo._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={() => saveEdit(todo._id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </>
          )}

          <select
            value={todo.status}
            onChange={(e) => updateStatus(todo._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="buttons">
            <button onClick={() => startEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)} className="delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;