import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedAutocomplete } from 'utils/hooks';
import { getFamiliesByProgram } from 'client/actions/familyActions';

export default function FamilyInput({ value, setFieldValue, programId }) {
  const families = useSelector(state => state.families.items);
  const dispatch = useDispatch();
  const { suggestions, query } = useDebouncedAutocomplete(families, 200);

  useEffect(() => {
    dispatch(getFamiliesByProgram(programId));
  }, [programId, dispatch]);

  return (
    <div>
      <label className="sr-only" htmlFor="Family">
        Family
      </label>
      <input
        id="family"
        className="form-input block"
        placeholder="Family"
        type="text"
        autoComplete="none"
        onChange={e => {
          if (value) {
            setFieldValue('family', '');
          }
          query.set(e.target.value);
        }}
        value={value ? families.byId[value].name : query.get}
      />
      {!value && suggestions.length !== 0 && (
        <div
          className="absolute bg-white overflow-auto"
          style={{ maxHeight: '16rem', minWidth: '12rem' }}
        >
          {suggestions.map((familyId, index) => (
            <div
              className="px-2 py-1 border border-b border-gray-200 text-sm hover:bg-gray-200"
              key={familyId}
              onClick={() => {
                setFieldValue('family', familyId);
              }}
            >
              {families.byId[familyId].name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
