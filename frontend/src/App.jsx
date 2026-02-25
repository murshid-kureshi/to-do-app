import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/todos?page=${page}`);
      setTodos(res.data.todos);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  // Apply Dark Class
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">TO'DO</h1>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <TodoForm fetchTodos={fetchTodos} />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <TodoList todos={todos} fetchTodos={fetchTodos} />
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}

export default App;