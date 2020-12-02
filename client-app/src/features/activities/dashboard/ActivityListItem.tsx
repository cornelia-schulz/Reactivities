import React, { useContext } from 'react'
import { Button, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ActivityStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';

export const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, submitting, target } = activityStore;

  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a">{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link} to={`/activities/${activity.id}`}
            color="blue"
            content="View"
            floated="right"
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}
