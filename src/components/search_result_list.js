import React from 'react';
import SearchResultListItem from './search_result_list_item';

const SearchResultList = (props) => {

  const resultItems = props.items_list.map((item) => {
    return (
      <SearchResultListItem
        item={item}
        onClickHandler={props.onClickHandler}
        key={item.id} />
    );
  });
  
  return (
    <div id={props.list_id} className={props.is_active ? 'search-hints' : 'search-hints hide'}>
      <ul>
        {resultItems}
      </ul>
    </div>
  );
}

export default SearchResultList;
