import React from 'react';

const SearchResultListItem = ({item, onClick}) => {
  return (
    <li>
      <div className="img-box-round-50">
        <img src={item.imageUrl} />
      </div>
      <p>{item.resourceName}</p>
      <p>{item.title}</p>
      <a href="" className="link" onClick={(event) => onClick(event, item.resourceId, item.resourceName)}>Valitse</a>
    </li>
  );
}

export default SearchResultListItem;
