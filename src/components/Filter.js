import React from "react";

const Filter = ({ setCategory }) => {
  const categories = [
    "general",
    "business",
    "technology",
    "sports",
    "entertainment",
    "health",
    "science",
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="btn btn-primary m-1 px-4 py-2"
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;