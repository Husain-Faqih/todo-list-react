import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("semua");
  const [priority, setPriority] = useState("rendah");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
      setError("Tugas tidak boleh kosong!");
      return;
    }

    setError("");

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
    setEditError("");
  }

  function handleSimpanEdit(id) {
    const textBaru = editValue.trim();

    if (textBaru === "") {
      setEditError("Tugas tidak boleh kosong!");
      return;
    }

    setEditError("");

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

  const editState = {
    id: editId,
    value: editValue,
    error: editError,
  };

  const editActions = {
    setValue: setEditValue,
    start: handleEdit,
    save: handleSimpanEdit,
    cancel: handleBatalEdit,
  };

  const deleteState = {
    id: deleteId,
  };

  const deleteActions = {
    setId: setDeleteId,
    remove: handleHapus,
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <TodoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTambah={handleTambah}
        error={error}
      />

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

      <TodoStats todos={todos} />

      <FilterButtons filter={filter} setFilter={setFilter} />

      <TodoList
        todos={todosTampil}
        editState={editState}
        editActions={editActions}
        deleteState={deleteState}
        deleteActions={deleteActions}
        handleToggle={handleToggle}
      />
    </div>
  );
}

export default App;
