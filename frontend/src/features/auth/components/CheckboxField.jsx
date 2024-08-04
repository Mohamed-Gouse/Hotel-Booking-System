import React from "react";

const CheckboxField = ({ name, value, setValue }) => {
  const handleChange = (e) => {
    const newValue = e.target.checked ? "hotel" : "user";
    setValue({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <input
      type="checkbox"
      name={name}
      checked={value === "hotel"}
      onChange={handleChange}
    />
  );
};

export default CheckboxField;
