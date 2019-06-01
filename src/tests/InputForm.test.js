import React from "react";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render, fireEvent } from "react-testing-library";
import InputForm from "../components/InputForm";

const createNewPlane = jest.fn();
const message = /Input Error/i;

describe("Input Form", () => {
  it("should display error message on no input", () => {
    const { getByText, getByLabelText } = render(
      <InputForm createNewPlane={createNewPlane} />
    );
    const seatInput = getByLabelText(/seats/i);
    const passengersInput = getByLabelText(/passengers/i);

    fireEvent.change(seatInput, { target: { value: "" } });
    fireEvent.change(passengersInput, { target: { value: "" } });
    fireEvent.click(getByText("Submit"));
    expect(getByText(message)).toBeInTheDocument();
  });

  it("should display correct error message depending on input", () => {
    const { getByText, getByLabelText } = render(
      <InputForm createNewPlane={createNewPlane} />
    );
    const passengersErrMsg = /passengers must be at least 0/i;
    const seatsErrMsg = /seats must be a valid array/i;
    const seatInput = getByLabelText(/seats/i);
    const passengersInput = getByLabelText(/passengers/i);

    fireEvent.change(seatInput, { target: { value: "[[2,2],[2,2],[2,2]]" } });
    fireEvent.change(passengersInput, { target: { value: "-1" } });
    fireEvent.click(getByText("Submit"));
    expect(getByText(passengersErrMsg)).toBeInTheDocument();

    fireEvent.change(seatInput, { target: { value: "[[10,2],[2,2],[2,2]]" } });
    fireEvent.change(passengersInput, { target: { value: "20" } });
    fireEvent.click(getByText("Submit"));
    expect(getByText(seatsErrMsg)).toBeInTheDocument();
  });

  it("should successfully call createPlane on correct input", () => {
    window.scrollTo = jest.fn();
    const { getByText, queryByText, getByLabelText } = render(
      <InputForm createNewPlane={createNewPlane} />
    );
    const seatInput = getByLabelText(/seats/i);
    const passengersInput = getByLabelText(/passengers/i);

    fireEvent.change(seatInput, { target: { value: "[2,3],[2,3]" } });
    fireEvent.change(passengersInput, { target: { value: "2" } });
    fireEvent.click(getByText("Submit"));
    expect(queryByText(message)).toBeNull();
    expect(createNewPlane).toBeCalled();
    window.scrollTo.mockClear();
  });
});
