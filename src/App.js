/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import "./App.css";
import Datepicker from "./Datepicker";

function App() {
  const [formData, setFormData] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState("N/A");
  const [day, setDay] = React.useState(undefined);
  const [month, setMonth] = React.useState(undefined);
  const [year, setYear] = React.useState(undefined);

  const onChangeDate = React.useCallback((event, date) => {
    setDay(undefined);
    setMonth(undefined);
    setYear(undefined);
    setCurrentDate(date);
  }, []);

  const onSubmit = React.useCallback(event => {
    event.preventDefault();

    const data = [...new FormData(event.target)].reduce(
      (acc, [key, value]) => [...acc, { key, value }],
      []
    );

    setFormData(data);
  }, []);

  const calendarChange = React.useCallback(event => {
    setDay("11");
    setMonth("09");
    setYear("2001");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Current date (from Datepicker onChange)</h2>
        <p>{currentDate}</p>
        <button type="button" onClick={calendarChange}>
          Change to 09/11/2001
        </button>
        <h2>Datepicker form:</h2>
        <form onSubmit={onSubmit}>
          <Datepicker
            name="muh datepicker"
            onChange={onChangeDate}
            day={day}
            month={month}
            year={year}
          />
          <button type="submit">Submit</button>
        </form>
        <h2>Form data:</h2>
        <ul
          css={css`
            margin: 0;
            list-style: inside;
          `}
        >
          {formData.map(({ key, value }) => (
            <li key={key}>
              <strong>{key}:</strong>&nbsp;{value}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
