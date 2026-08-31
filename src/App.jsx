import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);

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
        text: todoText,
        completed: false,
      },
    ]);

    setInputValue("");
  }

  function handleHapus(index) {
    const todosBaru = todos.filter((todo, i) => i !== index);

    setTodos(todosBaru);
  }

  function handleToggle(index) {
    const todosBaru = todos.map((todo, i) => {
      if (i === index) {
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
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => handleToggle(index)}
              className={todo.completed ? "completed" : ""}
            >
              {todo.text}
            </span>

            <button onClick={() => setDeleteIndex(index)}>🗑</button>

            {deleteIndex === index && (
              <div className="confirm-box">
                <p>Yakin ingin menghapus tugas ini?</p>

                <div className="confirm-buttons">
                  <button
                    className="cancel-button"
                    onClick={() => setDeleteIndex(null)}
                  >
                    Batal
                  </button>
                  <button
                    className="confirm-delete-button"
                    onClick={() => handleHapus(index)}
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
