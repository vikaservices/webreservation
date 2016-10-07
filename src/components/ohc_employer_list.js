import React from 'react';

const OhcEmployerList = ({employers, selected_employer, onChange}) => {

  const result = employers.map((employer) => {
    return (
      <option value={employer.id}
              key={employer.id}
              selected={selected_employer.id == employer.id ? "selected" : ""}>{employer.name}</option>
    );
  });

  return (
    <div className="ohc-employer-list">
      <select onChange={(event) => onChange(event)}>
        {result}
      </select>
    </div>
  );
}

export default OhcEmployerList;
