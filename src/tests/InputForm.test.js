import React from "react";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render, fireEvent } from "react-testing-library";
import InputForm from "./../components/InputForm";

const createNewPlane = jest.fn();
window.scrollTo = jest.fn();

const message = /Input Error/i;

describe("Input Form", () => {
  it("should display error message on wrong input", () => {
    const { getByText, getByLabelText } = render(
      <InputForm createNewPlane={createNewPlane} />
    );
    const seatInput = getByLabelText(/seats/i);
    const passengersInput = getByLabelText(/passengers/i);

    fireEvent.change(seatInput, { target: { value: "bad input" } });
    fireEvent.change(passengersInput, { target: { value: "2" } });
    fireEvent.click(getByText("Submit"));
    expect(getByText(message)).toBeInTheDocument();
  });
  it("should successfully call createPlane on correct input", () => {
    const { getByText, queryByText, getByLabelText } = render(
      <InputForm createNewPlane={createNewPlane} />
    );
    const seatInput = getByLabelText(/seats/i);
    const passengersInput = getByLabelText(/passengers/i);

    fireEvent.change(seatInput, { target: { value: "[2,3][2,3]" } });
    fireEvent.change(passengersInput, { target: { value: "2" } });
    fireEvent.click(getByText("Submit"));
    expect(queryByText(message)).not.toBeInTheDocument();
    expect(createNewPlane).toBeCalled();
    window.scrollTo.mockClear();
  });
});
