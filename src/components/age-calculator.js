import React from 'react';
import { useState } from 'react';
import { DateInput, DateValues } from '../components';
import IconArrow from '../icon-arrow.svg';

export default function AgeCalculator() {
  var [date, setDate] = useState({
    day: undefined,
    month: undefined,
    year: undefined,
  });
  var structions = {
    day: { min: 1, max: 31 },
  };
  function calculateAge(day, month, year) {
    // Get current date
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // January is 0
    var currentDay = currentDate.getDate();

    // Calculate age in years
    var ageYears = currentYear - year;

    // Calculate age in months
    var ageMonths = currentMonth - month;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      ageMonths--;
    }

    // Calculate age in days
    var ageDays = currentDay - day;
    if (ageDays < 0) {
      var daysInPreviousMonth = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate();
      ageMonths--;
      ageDays = daysInPreviousMonth - day + currentDay;
    }

    // Adjust age if months are negative
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };
  }
  var makeError = (n, m = 'validate') => {
    let message =
      m == 'required' ? 'This field is required' : `Must be a valid ${n}`;
    let element = document.querySelector(`input#${n}`);
    if (element.classList.contains('error')) {
      return;
    }
    let errorElement = document.querySelector(`input#${n} ~ .error-text`);
    errorElement.innerHTML = message;
    element.parentElement.classList.add('error');
  };
  var clearError = () => {
    ['day', 'month', 'year'].forEach((v) => {
      let element = document.querySelector(`input#${v}`);
      element.parentElement.classList.remove('error');
    });
  };
  function validateDate(day, month, year) {
    let valid = true;
    clearError();
    // Check if any input is empty
    if (!day || !month || !year) {
      if (!day) {
        makeError('day', 'required');
      }
      if (!month) {
        makeError('month', 'required');
      }
      if (!year) {
        makeError('year', 'required');
      }
      valid = false;
    }

    // Convert inputs to integers
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    // Perform basic validation checks
    if (month < 1 || month > 12) {
      makeError('month');
      valid = false;
    }

    if (day < 1 || day > 31) {
      makeError('day');
      valid = false;
    }

    // Additional validation for months with fewer than 31 days
    if ([4, 6, 9, 11].includes(month) && day > 30) {
      makeError('day');
      valid = false;
    }

    if (month === 2) {
      // Leap year calculation
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        if (day > 29) {
          makeError('day');
          valid = false;
        }
      } else if (day > 28) {
        makeError('day');
        valid = false;
      }
    }

    // Create Date objects for input date and current date
    var inputDate = new Date(year, month - 1, day);
    var currentDate = new Date();

    // Check if input date is greater than current date
    if (inputDate > currentDate) {
      makeError('year');
      valid = false;
    }

    // If all checks pass, the date is valid
    return valid;
  }
  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  var handleSubmit = (e) => {
    e.preventDefault();
    let values = document.querySelector('.date-values');
    let day = +e.target[0].value;
    let month = +e.target[1].value;
    let year = +e.target[2].value;
    let age;
    if (validateDate(day, month, year)) {
      age = calculateAge(day, month, year);
    } else {
      age = { day: undefined, month: undefined, year: undefined };
    }
    if (compareObjects(age, date)) {
      return;
    }
    setDate(age);
    values.classList.toggle('active');
    setTimeout(() => {
      setDate(age);
    }, 100);
    setTimeout(() => {
      values.classList.toggle('active');
    }, 100);
  };
  return (
    <form className="calc-wrapper" onSubmit={handleSubmit}>
      <div className="date-inputs">
        <DateInput name="day" />
        <DateInput name="month" />
        <DateInput name="year" />
      </div>
      <div className="mid-part">
        <span className="line"></span>
        <input type="submit" id="submit-calc" />
        <label htmlFor="submit-calc" className="calc-button"></label>
      </div>
      <DateValues date={date} />
    </form>
  );
}
