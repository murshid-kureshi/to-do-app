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

      return (
        <div className="container">
          <h1 className="title">TO'DO</h1>

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