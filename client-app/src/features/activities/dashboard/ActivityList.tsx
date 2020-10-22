import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
  activities: IActivity[];
  deleteActivity: (id: string) => void;
  selectActivity: (id: string) => void;
  submitting: boolean;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  deleteActivity,
  selectActivity,
  submitting
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  color="blue"
                  content="View"
                  floated="right"
                  onClick={() => selectActivity(activity.id)}
                />
                <Button
                  color="red"
                  content="Delete"
                  floated="right"
                  loading={submitting}
                  onClick={() => deleteActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
