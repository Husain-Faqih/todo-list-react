function TodoInput({ inputValue, setInputValue, handleTambah, error }) {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          placeholder="Masukkan Tugas.."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />

        <button onClick={handleTambah}>Tambah</button>
      </div>
      {error && <p className="error-message">⚠ {error}</p>}
    </>
  );
}

export default TodoInput;
