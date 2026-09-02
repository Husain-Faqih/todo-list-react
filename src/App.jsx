import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  function handleTambah() {
    const todoText = inputValue.trim();

    if (todoText === "") {
      alert("Tugas tidak boleh kosong!");
      return;
    }

    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: todoText,
        completed: false,
      },
    ]);

    setInputValue("");
  }

  function handleHapus(id) {
    const todosBaru = todos.filter((todo) => todo.id !== id);

    setTodos(todosBaru);
  }

  function handleToggle(id) {
    const todosBaru = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(todosBaru);
  }

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Masukkan Tugas.."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleTambah();
            }
          }}
        />

        <button onClick={handleTambah}>Tambah</button>
      </div>

      <p className="card">
        Total tugas: {todos.length} | Selesai: {completed} | Belum selesai:{" "}
        {pending}
      </p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => handleToggle(todo.id)}
              className={todo.completed ? "completed" : ""}
            >
              {todo.text}
            </span>

            <button onClick={() => setDeleteId(todo.id)}>🗑</button>

            {deleteId === todo.id && (
              <div className="confirm-box">
                <p>Yakin ingin menghapus tugas ini?</p>
              
                <div className="confirm-buttons">
                  <button
                    className="cancel-button"
                    onClick={() => setDeleteId(null)}
                  >
                    Batal
                  </button>
                  <button
                    className="confirm-delete-button"
                    onClick={() => handleHapus(todo.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
