import React, { useState, useEffect } from "react";

const CategoryCheckbox = ({ categories, handleFilters }) => {
  //#region State
  const [checked, setCheked] = useState([]);
  //#endregion

  //#region Handlers and Functions
  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c); //add to array
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1); //remove from array
    }
    // console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    // handleFilters(newCheckedCategoryId, "category");
    handleFilters(newCheckedCategoryId);
    // console.log(newCheckedCategoryId);
  };
  //#endregion

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled mb-2">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
        style={{ marginLeft: "-14px" }}
      />
      <label className="form-check-label" style={{ marginLeft: "14px" }}>
        {c.name}
      </label>
    </li>
  ));
};
export default CategoryCheckbox;
