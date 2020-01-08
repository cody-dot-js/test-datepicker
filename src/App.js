/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import "./App.css";
import Datepicker from "./Datepicker";

function App() {
  const [formData, setFormData] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState("N/A");

  const onChangeDate = React.useCallback(date => setCurrentDate(date), []);

  const onSubmit = React.useCallback(event => {
    event.preventDefault();

    const data = [...new FormData(event.target)].reduce(
      (acc, [key, value]) => [...acc, { key, value }],
      []
    );

    setFormData(data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Current date (from Datepicker onChange)</h2>
        <p>{currentDate}</p>
        <h2>Datepicker form:</h2>
        <form onSubmit={onSubmit}>
          <Datepicker name="muh datepicker" onChange={onChangeDate} />
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
