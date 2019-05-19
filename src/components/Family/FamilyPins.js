import React, { useState } from 'react';

import EditFamilyPins from './EditFamilyPins';

export default ({ family }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="p-2 border w-1/3">
      <div className="flex">
        <h3 className="">Pickups</h3>
        <button
          className={`${
            edit
              ? 'bg-blue text-white hover:bg-white hover:text-black'
              : 'bg-white hover:text-white hover:bg-blue'
          } p-1 ml-auto text-xs border rounded`}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
      </div>
      <EditFamilyPins family={family} edit={edit} />
    </div>
  );
};
