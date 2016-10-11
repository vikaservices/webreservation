import React from 'react';
import OhcTeamListItem from './ohc_team_list_item';

const OhcTeamList = ({team, onClick}) => {

  const result = team.map((item) => {
    return (
      <OhcTeamListItem
        item={item}
        onClick={onClick}
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
