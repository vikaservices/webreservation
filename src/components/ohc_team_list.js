import React from 'react';
import OhcTeamListItem from './ohc_team_list_item';

const OhcTeamList = (props) => {

  const result = props.team.map((item) => {
    return (
      <OhcTeamListItem
        item={item}
        key={item.resourceId} />
    );
  });

  return (
    <div className="ohc-team-list">
      <ul>
        {result}
      </ul>
    </div>
  );
}

export default OhcTeamList;
