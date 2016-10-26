import React, { Component } from 'react';
import SearchResultListItem from './search_result_list_item';

class SearchResultList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected_index: 0
    }
  }

  renderList() {
    let index = -1;
    return this.props.items_list.map((item) => {
      index++;
      return (
        <SearchResultListItem
          item={item}
          selected={this.props.index == index ? true : false}
          onClickHandler={this.props.onClickHandler}
          key={item.id} />
      );
    });
  }

  render() {
    return (
      <div id={this.props.list_id} className={this.props.is_active ? 'search-hints' : 'search-hints hide'}>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default SearchResultList;
