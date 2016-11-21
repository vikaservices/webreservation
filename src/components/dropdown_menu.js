import React from 'react';

// Wrapper component for Bootstrap dropdown
const DropdownMenu = ({items, selected, onChange}) => {

  const options = items.map((item) => {
    return (
      <li key={item.id}>
        <a href="" onClick={(event) => onChange(item.id, event)} >{item.value}</a>
      </li>
    );
  });

  return (
    <div className="dropdown">
      <button className={items.length == 1 ? "dropdown-toggle btn-white-dropdown disabled" : "dropdown-toggle btn-white-dropdown"} type="button" data-toggle="dropdown">
        {selected}
        <span className="caret-container">
          <span className={items.length == 1 ? "" : "caret-mobile glyphicon glyphicon-menu-down"}></span>
          <span className={items.length == 1 ? "" : "caret-desktop caret"}></span>
        </span>
      </button>
      <ul className="dropdown-menu">
        {options}
      </ul>
    </div>
  );
}

export default DropdownMenu;
