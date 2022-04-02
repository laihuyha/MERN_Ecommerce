import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  //#region State
  const [value, setValue] = useState(0);
  //#endregion
  //#region Handlers and Functions
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    handleFilters(e.target.value, "price");
  };
  //#endregion

  return prices.map((p, i) => (
    <div key={i} className="list-unstyled">
      <input
        onChange={handleChange}
        value={`${p.id}`}
        name={p}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};
export default RadioBox;
