import React from 'react';


const SearchResultListItem = (props) => {


  return (
    <li>
     <a href="" onClick={(event) => props.onClickHandler(props.item.id, props.item.type,
                                                         props.item.name, event)}
                className={props.selected ? "search-hints-selected" : ""} >{props.item.name}</a>
    </li>
  );
}

export default SearchResultListItem;
