import React, { Component } from "react";

class ShowAirplaneSeats extends Component {
  isLoading = (seatingData, vw) => {
    if (!seatingData) {
      return (
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
    return (
      <div className="pt">
        {vw < 620 && (
          <div className="ui warning message">
            <div className="header">Switch to horizontal view on mobile.</div>
          </div>
        )}
        <h3>FRONT OF PLANE</h3>
        <h2>Remaining Passengers: {seatingData.remainingPassengers}</h2>
        {seatingData.seats.map((row, index) => {
          return (
            <div key={"row" + index}>
              {row.map((seat, index) => {
                if (Number.isInteger(seat)) {
                  return (
                    <div
                      key={"seat" + index}
                      className="ui grey circular label"
                    >
                      {seat}
                    </div>
                  );
                }
                if (seat === "seat") {
                  return (
                    <div
                      key={"seat" + index}
                      className="ui yellow circular label"
                    >
                      A
                    </div>
                  );
                }
                return (
                  <div
                    key={"seat" + index}
                    className="ui white circular label"
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { seatingData, vw } = this.props;

    return <div>{this.isLoading(seatingData, vw)}</div>;
  }
}

export default ShowAirplaneSeats;
