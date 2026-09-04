function TodoStats({ todos }) {
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  return (
    <p className="card">
      Total tugas: {todos.length} | selesai: {completed} | Belum selesai:{" "}
      {pending}
    </p>
  );
}

export default TodoStats;
