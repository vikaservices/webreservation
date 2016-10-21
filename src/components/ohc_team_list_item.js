import React from 'react';
import text from './common/translate';

const SearchResultListItem = ({item, onClick}) => {
  return (
    <li>
      <div className="img-box-round-50">
        <img src={item.imageUrl} />
      </div>
      <p>{item.resourceName}</p>
      <p>{item.title}</p>
      <a href="" className="link" onClick={(event) => onClick(event, item.resourceId, item.resourceName)}>{text('diacor_ohc_team_list_choose_link')}</a>
    </li>
  );
}

export default SearchResultListItem;
