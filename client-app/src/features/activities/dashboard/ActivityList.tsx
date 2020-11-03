import React, { SyntheticEvent, useContext } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string
}

const ActivityList: React.FC<IProps> = ({
  deleteActivity,
  target
}) => {

  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, selectActivity, submitting } = activityStore;

  return (
    console.log('activities in list ', activitiesByDate),
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
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
                  loading={target === activity.id && submitting}
                  name={activity.id}
                  onClick={(e) => deleteActivity(e, activity.id)}
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

export default observer(ActivityList);