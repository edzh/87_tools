import React from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function LetterFilter(props) {
  return (
    <div>
      {alphabet.map((letter, index) => (
        <button key={index} value={letter} onClick={props.filterLetter}>
          {letter}
        </button>
      ))}
    </div>
  );
}
