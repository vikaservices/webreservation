import React from 'react';

const SearchResultListItem = ({item}) => {
  return (
    <li>
      <img src={item.imageUrl} />
      <p>{item.resourceName}</p>
      <p>{item.title}</p>
      <a href="" className="link">Valitse</a>
    </li>
  );
}

export default SearchResultListItem;
