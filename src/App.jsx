import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("semua");
  const [priority, setPriority] = useState("rendah");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;
  const todosTampil = todos.filter((todo) => {
    if (filter === "selesai") {
      return todo.completed;
    }

    if (filter === "belum") {
      return !todo.completed;
    }

    return true;
  });

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
        priority: priority,
      },
    ]);

    setInputValue("");
  }

  function handleHapus(id) {
    const todosBaru = todos.filter((todo) => todo.id !== id);

    setTodos(todosBaru);
    setDeleteId(null);
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

  function handleEdit(todo) {
    setEditId(todo.id);
    setEditValue(todo.text);
  }

  function handleSimpanEdit(id) {
    const textBaru = editValue.trim();

    if (textBaru === "") {
      alert("Tugas tidak boleh kosong!");
      return;
    }

    const todosBaru = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: textBaru,
        };
      }

      return todo;
    });

    setTodos(todosBaru);
    setEditId(null);
    setEditValue("");
  }

  function handleBatalEdit() {
    setEditId(null);
    setEditValue("");
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

      <div className="priority-group">
        <label>Prioritas:</label>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="rendah">🟢Rendah</option>
          <option value="sedang">🟡Sedang</option>
          <option value="tinggi">🔴Tinggi</option>
        </select>
      </div>

      <p className="card">
        Total tugas: {todos.length} | Selesai: {completed} | Belum selesai:{" "}
        {pending}
      </p>

      <div className="filter-buttons">
        <button
          className={filter === "semua" ? "active" : ""}
          onClick={() => setFilter("semua")}
        >
          Semua
        </button>

        <button
          className={filter === "selesai" ? "active" : ""}
          onClick={() => setFilter("selesai")}
        >
          Selesai
        </button>

        <button
          className={filter === "belum" ? "active" : ""}
          onClick={() => setFilter("belum")}
        >
          Belum selesai
        </button>
      </div>

      <ul>
        {todosTampil.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <div className="edit-group">
                <input
                  type="text"
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSimpanEdit(todo.id);
                    }
                  }}
                />

                <button onClick={() => handleSimpanEdit(todo.id)}>
                  Simpan
                </button>

                <button onClick={handleBatalEdit}>Batal</button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => handleToggle(todo.id)}
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>

                <span className={`priority ${todo.priority}`}>
                  {todo.priority}
                </span>

                <button onClick={() => handleEdit(todo)}>✏️</button>

                <button onClick={() => setDeleteId(todo.id)}>🗑️</button>
              </>
            )}

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
