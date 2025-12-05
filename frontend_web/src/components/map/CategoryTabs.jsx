const CategoryTabs = ({ selected, onSelect }) => {
  return (
    <div className="category-tabs">
      {["praia", "cultura", "lazer"].map((cat) => (
        <button
          key={cat}
          className={`tab-button ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
