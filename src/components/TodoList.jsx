import TodoItem from "./TodoItem";

function TodoList({
  todos,
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
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editId={editId}
          editValue={editValue}
          editError={editError}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          handleSimpanEdit={handleSimpanEdit}
          handleBatalEdit={handleBatalEdit}
          handleToggle={handleToggle}
          setDeleteId={setDeleteId}
          deleteId={deleteId}
          handleHapus={handleHapus}
        />
      ))}
    </ul>
  );
}

export default TodoList;
