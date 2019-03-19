import React from 'react';
import { useFormInput } from './AddStudent';

export default function EditStudent(props) {
  const name = useFormInput('');
  const grade = useFormInput('');
  const pin = useFormInput('');

  return (
    <form>
      <input type="text" />
      <select>
        <option value="0">K</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input type="number" />
      <button>Save</button>
    </form>
  );
}
