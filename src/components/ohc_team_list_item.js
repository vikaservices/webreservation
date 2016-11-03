import React from 'react';
import text from './common/translate';

const SearchResultListItem = ({item, onClick}) => {
  return (
    <li>
      <div className="ohc-image">
        <img src={item.imageUrl ? item.imageUrl : '/public/img/placeholder-person-image.png'} />
      </div>
      <div className="ohc-resource-info">
        <p className="ohc-name">{item.resourceName}</p>
        <p className="ohc-title">{item.title}</p>
      </div>
      <span className="ohc-link" >
        <a href=""onClick={(event) => onClick(event, item.resourceId, item.resourceName)}>{text('diacor_ohc_team_list_choose_link')}</a>
      </span>
    </li>
  );
}

export default SearchResultListItem;
