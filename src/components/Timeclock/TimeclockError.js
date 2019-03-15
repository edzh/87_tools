import React from 'react';

export default function TimeclockError(props) {
  if (!props.error) {
    return null;
  }

  return <p>{props.error}</p>;
}
