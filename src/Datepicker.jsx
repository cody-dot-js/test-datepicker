/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const inputCss = css`
  border: none;
  background: transparent;
  width: 2rem;
  height: 100%;
  font-size: 1rem;
`;

function Divider({ isShown }) {
  return (
    <div
      css={css`
        padding: 0 0.5rem;
        visibility: ${isShown ? "visible" : "hidden"};
      `}
    >
      /
    </div>
  );
}

function Datepicker({ name, onChange }) {
  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");
  const [year, setYear] = React.useState("");
  const [showFirstSlash, setShowFirstSlash] = React.useState(false);
  const [showSecondSlash, setShowSecondSlash] = React.useState(false);
  const monthRef = React.useRef(null);
  const dayRef = React.useRef(null);
  const yearRef = React.useRef(null);

  const computedDateValue = React.useMemo(
    () =>
      // I know this is supposed to be an ISO format, but whatever
      `${month}/${day}/${year}`,
    [day, month, year]
  );

  const onChangeMonth = React.useCallback(event => {
    const { value } = event.target;
    const newMonth = value.replace(/[^0-9]/g, "").slice(0, 2);

    setMonth(newMonth);

    if (newMonth.length === 2) {
      setShowFirstSlash(true);
      dayRef.current.focus();
    }
  }, []);

  const onChangeDay = React.useCallback(event => {
    const { value } = event.target;

    const newDay = value.replace(/[^0-9]/g, "").slice(0, 2);
    setDay(newDay);

    if (newDay.length === 2) {
      setShowSecondSlash(true);
      yearRef.current.focus();
    }
  }, []);

  const onChangeYear = React.useCallback(event => {
    const { value } = event.target;
    const newYear = value.replace(/[^0-9]/g, "").slice(0, 4);
    setYear(newYear);
  }, []);

  React.useEffect(() => {
    if (onChange) {
      onChange(computedDateValue);
    }
  }, [computedDateValue, onChange]);

  return (
    <div
      css={css`
        color: rgba(0, 0, 0, 0.87);
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <input
        // Create a hidden input for storing the name and value attributes to use when submitting the form.
        data-terra-date-input-hidden
        type="hidden"
        name={name}
        value={computedDateValue}
      />
      <input
        ref={monthRef}
        css={inputCss}
        // name="month"
        onChange={onChangeMonth}
        value={month}
        type="text"
      />
      <Divider isShown={showFirstSlash} />
      <input
        ref={dayRef}
        css={inputCss}
        // name="day"
        onChange={onChangeDay}
        value={day}
        type="text"
      />
      <Divider isShown={showSecondSlash} />
      <input
        ref={yearRef}
        css={css`
          ${inputCss}
          width: 4rem;
        `}
        // name="year"
        onChange={onChangeYear}
        value={year}
        type="text"
      />
    </div>
  );
}

export default Datepicker;
