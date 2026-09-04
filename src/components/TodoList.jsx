import TodoItem from "./TodoItem";

function TodoList({
  todos,
  editState,
  editActions,
  deleteState,
  deleteActions,
  handleToggle,
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editState={editState}
          editActions={editActions}
          deleteState={deleteState}
          deleteActions={deleteActions}
          handleToggle={handleToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
