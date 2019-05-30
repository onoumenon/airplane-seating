import React from "react";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Legend from "./../components/Legend";

describe("Display Legend", () => {
  it("should display the title of Legend", () => {
    const { getByText } = render(<Legend />);
    expect(getByText(/legend/i)).toBeInTheDocument();
  });
  it("should display the legends for the seat icons", () => {
    const { getByText } = render(<Legend />);
    expect(getByText(/assigned order/i)).toBeInTheDocument();
    expect(getByText(/available seat/i)).toBeInTheDocument();
  });
});
