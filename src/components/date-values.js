import React from 'react';

export default function DateValues({ date }) {
  return (
    <div className="date-values">
      <div className="date-value">
        <span className="actual-value">{date.years ?? '--'}</span> Years
      </div>
      <div className="date-value">
        <span className="actual-value">{date.months ?? '--'}</span> Months
      </div>
      <div className="date-value">
        <span className="actual-value">{date.days ?? '--'}</span> Days
      </div>
    </div>
  );
}
