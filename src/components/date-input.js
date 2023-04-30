import React from 'react';

export default function DateInput({ name }) {
  return (
    <div className="date-input">
      <span className="input-name">{name}</span>
      <input
        id={name}
        placeholder={name == 'year' ? name[0].repeat(4) : name[0].repeat(2)}
        type="text"
        minlength="1"
        maxlength={name == 'year' ? '4' : '2'}
        require
      />
      <span className="error-text"></span>
    </div>
  );
}
