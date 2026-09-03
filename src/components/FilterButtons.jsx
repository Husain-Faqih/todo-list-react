function FilterButtons({ filter, setFilter }) {
  return (
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
  );
}

export default FilterButtons;
