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

function formatDateValue(month, day, year) {
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  const formattedYear = year.padStart(4, "0");

  // I know this is supposed to be an ISO format, but whatever
  return `${formattedMonth}/${formattedDay}/${formattedYear}`;
}

function Datepicker({ name, onChange, ...props }) {
  const [month, setMonth] = React.useState(props.month);
  const [day, setDay] = React.useState(props.day);
  const [year, setYear] = React.useState(props.year);

  const [showFirstSlash, setShowFirstSlash] = React.useState(false);
  const [showSecondSlash, setShowSecondSlash] = React.useState(false);

  const hiddenInputRef = React.useRef(null);
  const monthRef = React.useRef(null);
  const dayRef = React.useRef(null); // ahhhhhh, fighter of the night ref
  const yearRef = React.useRef(null);

  const onChangeMonth = React.useCallback(event => {
    const { value } = event.target;
    const newMonth = value;

    setMonth(newMonth);

    if (newMonth.length === 2) {
      dayRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (month.length === 2) {
      setShowFirstSlash(true);
    }
  }, [month.length]);

  const onChangeDay = React.useCallback(event => {
    const { value } = event.target;
    const newDay = value.replace(/[^0-9]/g, "");

    setDay(newDay);

    if (newDay.length === 2) {
      yearRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    if (day.length === 2) {
      setShowSecondSlash(true);
    }
  }, [day.length]);

  const onChangeYear = React.useCallback(event => {
    const { value } = event.target;
    const newYear = value.replace(/[^0-9]/g, "");

    setYear(newYear);
  }, []);

  function onChangeDate(event) {
    const currentMonth = monthRef.current.value;
    const currentDay = dayRef.current.value;
    const currentYear = yearRef.current.value;

    const formattedDate = formatDateValue(
      currentMonth,
      currentDay,
      currentYear
    );
    event.target = hiddenInputRef.current;

    if (onChange) {
      onChange(event, formattedDate);
    }
  }

  const formattedDate = formatDateValue(month, day, year);

  React.useEffect(() => {
    if (props.month || props.day || props.year) {
      setMonth(props.month);
      setDay(props.day);
      setYear(props.year);
    }
  }, [props.day, props.month, props.year]);

  return (
    <div
      onChange={onChangeDate}
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
        type="hidden"
        name={name}
        ref={hiddenInputRef}
        data-terra-date-input-hidden
        value={formattedDate}
      />
      {/* MONTH INPUT */}
      <input
        ref={monthRef}
        css={inputCss}
        onChange={onChangeMonth}
        value={month}
        type="text"
        maxLength={2}
      />
      <Divider isShown={showFirstSlash} />
      {/* DAY INPUT */}
      <input
        ref={dayRef}
        css={inputCss}
        onChange={onChangeDay}
        value={day}
        type="text"
        maxLength={2}
      />
      <Divider isShown={showSecondSlash} />
      {/* YEAR INPUT */}
      <input
        ref={yearRef}
        css={css`
          ${inputCss}
          width: 4rem;
        `}
        onChange={onChangeYear}
        value={year}
        type="text"
        maxLength={4}
      />
    </div>
  );
}

Datepicker.defaultProps = {
  day: "",
  month: "",
  year: ""
};

export default Datepicker;
