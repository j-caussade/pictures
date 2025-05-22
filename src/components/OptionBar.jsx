import React from "react";

export default function OptionBar({
  onCategoryChange,
  onOrderChange,
  onSearchChange,
}) {
  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };
  const handleOrderChange = (event) => {
    onOrderChange(event.target.value);
  };

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="navbar bg-base-100 justify-center gap-4">
      <p>Search:</p>
      <input
        type="text"
        placeholder="Write something..."
        className="input input-bordered w-50"
        onChange={handleSearchChange}
      />
      <p>Order by:</p>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleOrderChange}
        defaultValue={"Name A to Z"}
      >
        <option value="Name A to Z">Name A to Z</option>
        <option value="Name Z to A">Name Z to A</option>
        <option value="Date added new to old">Date added new to old</option>
        <option value="Date added old to new">Date added old to new</option>
      </select>
      <p>Filter by category:</p>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleCategoryChange}
        defaultValue={"All"}
      >
        <option value="All">All</option>
        <option value="Art">Art</option>
        <option value="Architecture">Architecture</option>
        <option value="History">History</option>
        <option value="Nature">Nature</option>
        <option value="Objects">Objects</option>
      </select>
    </div>
  );
}
