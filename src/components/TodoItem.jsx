function TodoItem({
  todo,
  editId,
  editValue,
  editError,
  setEditValue,
  handleEdit,
  handleSimpanEdit,
  handleBatalEdit,
  handleToggle,
  setDeleteId,
  deleteId,
  handleHapus,
}) {
  return (
    <li className="todo-item">
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

          {editError && <p className="error-message">⚠ {editError}</p>}

          <button onClick={() => handleSimpanEdit(todo.id)}>Simpan</button>

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

          <span className={`priority ${todo.priority}`}>{todo.priority}</span>

          <button onClick={() => handleEdit(todo)}>✏️</button>

          <button onClick={() => setDeleteId(todo.id)}>🗑️</button>
        </>
      )}

      {deleteId === todo.id && (
        <div className="confirm-box">
          <p>Yakin ingin menghapus tugas ini?</p>

          <div className="confirm-buttons">
            <button className="cancel-button" onClick={() => setDeleteId(null)}>
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
  );
}

export default TodoItem;
