import React from "react";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import ShowAirplaneSeats from "./../components/ShowAirplaneSeats";

const seatingData = {
  seats: [
    [9, 13, 1, "aisle", 2, 3, "aisle", 4, 14, 10],
    [11, 15, 5, "aisle", 6, 7, "aisle", 8, "seat", 12]
  ],
  remainingPassengers: 18,
  assignedSeats: 15
};

describe("Show Airplane Seats", () => {
  it("should display the 'front (of plane)' title", () => {
    const { getByText } = render(
      <ShowAirplaneSeats seatingData={seatingData} />
    );
    expect(getByText(/front/i)).toBeInTheDocument();
  });
  it("should display the correct remaining passengers", () => {
    const { getByText } = render(
      <ShowAirplaneSeats seatingData={seatingData} />
    );
    expect(getByText(/remaining passengers/i)).toHaveTextContent("18");
  });
  it("should display the correct number of seats", () => {
    const { getAllByText } = render(
      <ShowAirplaneSeats seatingData={seatingData} />
    );
    const numbers = seatingData.assignedSeats + 1;
    expect(getAllByText(/\d/)).toHaveLength(numbers);
  });
});
