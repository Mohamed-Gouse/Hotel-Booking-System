import React from "react";

function Block({name, stat}) {
  return (
    <div className="col-md-4">
      <div className="p-5 bg-white text-center font-weight-bold h4 rounded shadow">
        {name} - {stat}
      </div>
    </div>
  );
}

export default Block;
