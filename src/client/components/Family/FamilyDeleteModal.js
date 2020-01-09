import React, { useState } from 'react';

export default ({ family, deleteCurrentFamily }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="p-1 bg-red-500 text-white border rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Delete
      </button>
      {showModal && (
        <div className="  w-full h-full shadow-lg opacity-100">
          <div className="bg-black opacity-25 w-full h-full" />
          <div className=" absolute mx-auto items-center flex w-1/2 z-10">
            <div className="p-4 border rounded mx-auto shadow bg-white opacity-100 z-10">
              <h3>
                Are you sure?{' '}
                <button
                  className="p-1 text-xl bold"
                  onClick={() => setShowModal(!showModal)}
                >
                  x
                </button>
              </h3>
              <button
                className="p-1 bg-red-500 text-white border rounded"
                onClick={() => deleteCurrentFamily(family._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
