import React from "react";

const Legend = () => {
  return (
    <div className="text-align-left pl-5">
      <h2>Legend</h2>
      <div className="pt">
        <p className="ui grey circular label">.no</p>
        {"  "}Assigned Order
      </div>
      <div className="pt">
        <p className="ui yellow circular label">A</p>
        {"  "}Available Seat
      </div>
    </div>
  );
};

export default Legend;
