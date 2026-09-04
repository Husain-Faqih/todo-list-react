function TodoItem({
  todo,
  editState,
  editActions,
  deleteState,
  deleteActions,
  handleToggle,
}) {
  return (
    <li className="todo-item">
      {editState.id === todo.id ? (
        <div className="edit-group">
          <input
            type="text"
            value={editState.value}
            onChange={(event) => editActions.setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                editActions.save(todo.id);
              }
            }}
          />

          {editState.error && (
            <p className="error-message">⚠ {editState.error}</p>
          )}

          <button onClick={() => editActions.save(todo.id)}>Simpan</button>

          <button onClick={editActions.cancel}>Batal</button>
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

          <button onClick={() => editActions.start(todo)}>✏️</button>

          <button onClick={() => deleteActions.setId(todo.id)}>🗑️</button>
        </>
      )}

      {deleteState.id === todo.id && (
        <div className="confirm-box">
          <p>Yakin ingin menghapus tugas ini?</p>

          <div className="confirm-buttons">
            <button
              className="cancel-button"
              onClick={() => deleteActions.setId(null)}
            >
              Batal
            </button>

            <button
              className="confirm-delete-button"
              onClick={() => deleteActions.remove(todo.id)}
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
