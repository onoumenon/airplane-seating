import React from "react";

const Legend = () => {
  return (
    <div className="text-align-right pr-10">
      <h2>Legend</h2>
      <div className="pt">
        Assigned Order: <p className="ui grey circular label">.no</p>
      </div>
      <div className="pt">
        Available Seat: <p className="ui yellow circular label">A</p>
      </div>
    </div>
  );
};

export default Legend;
