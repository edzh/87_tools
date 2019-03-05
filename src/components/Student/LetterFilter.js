import React from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

console.log(alphabet);

export default function LetterFilter(props) {
  return (
    <div>
      {alphabet.map(letter => (
        <button value={letter} onClick={props.filterLetter}>
          {letter}
        </button>
      ))}
    </div>
  );
}
