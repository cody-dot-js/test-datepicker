/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import logo from "./logo.svg";
import "./App.css";
import Datepicker from "./Datepicker";

function App() {
  const [formData, setFormData] = React.useState([]);
  const onSubmit = React.useCallback(event => {
    event.preventDefault();

    const data = [...new FormData(event.target)]
      .filter(([k]) => k !== "removeme")
      .reduce((acc, [key, value]) => [...acc, { key, value }], []);

    setFormData(data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2>Datepicker form:</h2>
        <form onSubmit={onSubmit}>
          <Datepicker name="muh datepicker" />
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
