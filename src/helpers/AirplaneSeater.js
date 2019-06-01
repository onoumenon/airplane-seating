import { isValid2dArray, isNonNegativeSafeInteger } from "./ValidationHelper";

export default class AirplaneSeater {
  constructor(seats, passengers = 0) {
    this.seats = this._createSeats(seats);
    this.passengers = this._createPassengers(passengers);
    this.remainingPassengers = this.passengers;
    this.assignedSeats = this.seats;
  }
  nextSeatNumber = 1;

  get seatingData() {
    this._assignAllSeats();
    return {
      seats: this.assignedSeats,
      remainingPassengers: this.remainingPassengers
    };
  }

  _createPassengers(input) {
    if (!isNonNegativeSafeInteger(input)) {
      throw new Error(
        "Invalid passenger input. Must be a non-negative number."
      );
    }
    return input;
  }

  _createSeats(input) {
    if (!isValid2dArray(input)) {
      throw new Error("Invalid seat input. Expected 2d array of numbers.");
    }
    const maxColumns = Math.max(...input.map(arr => arr[1]));
    let seats = [];
    for (let colI = 0; colI < maxColumns; colI++) {
      let block = [];
      input.forEach(arr => {
        const row = arr[0];
        let col = arr[1];
        for (let i = 0; i < row; i++) {
          if (col - colI > 0) {
            block.push("seat");
          } else {
            block.push("empty");
          }
        }
        block.push("aisle");
      });
      block = block.slice(0, -1);
      seats.push(block);
    }
    return seats;
  }

  _assignSeatsBy(condition) {
    let seats = [...this.seats];
    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (seat === "seat" && condition(row, seatI)) {
          seats[rowI][seatI] = this.nextSeatNumber;
          this.nextSeatNumber++;
          this.remainingPassengers--;
        }
      });
    });
    this._assignedSeats = seats;
  }

  _isAisleSeat(row, seatI) {
    if (seatI <= 0 || seatI >= row.length - 1) {
      return false;
    }
    return row[seatI - 1] === "aisle" || row[seatI + 1] === "aisle";
  }

  _isWindowSeat(row, seatI) {
    return seatI === 0 || seatI === row.length - 1;
  }

  _isMiddleSeat(row, seatI) {
    return !(
      row[seatI - 1] === "aisle" ||
      row[seatI + 1] === "aisle" ||
      seatI === 0 ||
      seatI === row.length - 1
    );
  }

  _assignAllSeats() {
    this._assignSeatsBy(this._isAisleSeat);
    this._assignSeatsBy(this._isWindowSeat);
    this._assignSeatsBy(this._isMiddleSeat);
  }
}
