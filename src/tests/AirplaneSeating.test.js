import AirplaneSeating from "./../AirplaneSeating";

describe("Validate Input for seats", () => {
  it("should throw if input is empty array", () => {
    expect(() => new AirplaneSeating([])).toThrow();
  });
  it("should throw if input is not a 2d array", () => {
    expect(() => new AirplaneSeating([1, 2])).toThrow();
  });
  it("should not throw if input is a 2d array with numbers", () => {
    expect(() => new AirplaneSeating([[1, 2], [2, 3]])).toBeTruthy();
  });
  it("should throw if input is a 2d array with non-numbers", () => {
    expect(() => new AirplaneSeating([[1, 2], ["2", 3]])).toThrow();
  });
});

describe("Validate input for passengers", () => {
  it("should throw if passengers is negative number", () => {
    expect(() => new AirplaneSeating([[1, 2], [2, 3]], -1)).toThrow();
  });
  it("should return number of passengers via method on valid input", () => {
    const myAirplane = new AirplaneSeating([[1, 2], [2, 3]], 2);
    expect(myAirplane.passengers).toBe(2);
  });
});

describe("Create seats", () => {
  it("should return an array of seats", () => {
    const Airplane = new AirplaneSeating([[3, 1], [2, 2], [2, 1]]);
    expect(Airplane.seats).toEqual([
      [
        "seat",
        "seat",
        "seat",
        "aisle",
        "seat",
        "seat",
        "aisle",
        "seat",
        "seat"
      ],
      [
        "empty",
        "empty",
        "empty",
        "aisle",
        "seat",
        "seat",
        "aisle",
        "empty",
        "empty"
      ]
    ]);
  });
});

describe("Assign aisle seats", () => {
  it("should return assigned aisle seats", () => {
    const Airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
    Airplane._assignAisleSeats();
    expect(Airplane.assignedSeats).toEqual([
      ["seat", "seat", 1, "aisle", 2, "seat"],
      ["empty", "empty", "empty", "aisle", 3, "seat"]
    ]);
  });
  it("should return assigned aisle seats only for the number of passengers", () => {
    const Airplane = new AirplaneSeating([[2, 1], [2, 1], [2, 1]], 2);
    Airplane._assignAisleSeats();
    expect(Airplane.assignedSeats).toEqual([
      ["seat", 1, "aisle", 2, "seat", "aisle", "seat", "seat"]
    ]);
  });
});

describe("Assign window seats", () => {
  it("should return assigned window seats", () => {
    const Airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
    Airplane._assignWindowSeats();
    expect(Airplane.assignedSeats).toEqual([
      [1, "seat", "seat", "aisle", "seat", 2],
      ["empty", "empty", "empty", "aisle", "seat", 3]
    ]);
  });
  it("should return assigned window seats only for the number of passengers", () => {
    const Airplane = new AirplaneSeating([[2, 2], [2, 1], [2, 1]], 2);
    Airplane._assignWindowSeats();
    expect(Airplane.assignedSeats).toEqual([
      [1, "seat", "aisle", "seat", "seat", "aisle", "seat", 2],
      ["seat", "seat", "aisle", "empty", "empty", "aisle", "empty", "empty"]
    ]);
  });
});

describe("Assign middle seats", () => {
  it("should return assigned middle seats", () => {
    const Airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
    Airplane._assignMiddleSeats();
    expect(Airplane.assignedSeats).toEqual([
      ["seat", 1, "seat", "aisle", "seat", "seat"],
      ["empty", "empty", "empty", "aisle", "seat", "seat"]
    ]);
  });
  it("should return assigned middle seats only for the number of passengers", () => {
    const Airplane = new AirplaneSeating([[4, 1], [5, 1]], 2);
    Airplane._assignMiddleSeats();
    expect(Airplane.assignedSeats).toEqual([
      ["seat", 1, 2, "seat", "aisle", "seat", "seat", "seat", "seat", "seat"]
    ]);
  });
});

describe("Assign all seats", () => {
  it("should return assigned seats and remaining passengers", () => {
    const Airplane = new AirplaneSeating([[3, 2], [2, 2], [3, 2]], 17);
    Airplane._assignAllSeats();
    expect(Airplane.assignedSeats).toEqual([
      [9, 13, 1, "aisle", 2, 3, "aisle", 4, 14, 10],
      [11, 15, 5, "aisle", 6, 7, "aisle", 8, 16, 12]
    ]);
    expect(Airplane.remainingPassengers).toBe(1);
  });
  it("should return assigned seats only for the number of passengers", () => {
    const Airplane = new AirplaneSeating([[4, 1], [5, 1]], 5);
    Airplane._assignAllSeats();
    expect(Airplane.assignedSeats).toEqual([
      [3, 5, "seat", 1, "aisle", 2, "seat", "seat", "seat", 4]
    ]);
  });
});

describe("Get auto assigned seats", () => {
  it("should return an object with assigned seats and remaining passengers", () => {
    const Airplane = new AirplaneSeating([[4, 1], [5, 1]], 5);
    expect(Airplane.autoAssignedSeats).toEqual({
      remainingPassengers: 0,
      seats: [[3, 5, "seat", 1, "aisle", 2, "seat", "seat", "seat", 4]]
    });
  });
});
