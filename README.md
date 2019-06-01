## Airplane Seating Algorithm

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b18a7c8-3e23-41d4-8098-361adee39ab3/deploy-status)](https://app.netlify.com/sites/airplane-seating/deploys)

This project is done as part of a coding assignment

Write a program that helps seat passengers in a flight based on the following input and rules:

Rules

- Always seat passengers from front row to back row, starting from left to right
- Fill aisle seats first, followed by window seats, followed by middle seats.

Input

- A 2D array representing rows and columns: [[3,4],[4,5],[2,3],[3,4]]
- Number of passengers in queue: 30

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.

---

Folder structure in `src`

- `components` - front end React components
- `helpers` - helper functions (validation, airplane seating algorithm)
- `tests` - tests using Jest and react-testing-library (for both helper functions and React components)
