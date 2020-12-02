import React, { useContext } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { ActivityListItem } from './ActivityListItem';

export const ActivityList: React.FC = observer(() => {

  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, deleteActivity, submitting, target } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <ActivityListItem activity={activity} key={activity.id} />
        ))}
      </Item.Group>
    </Segment>
  );
});