import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';

// create this, so you tell route component props exactly what is in match
interface DetailParams {
  id: string
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = observer(({history, match}) => {

  const activityStore = useContext(ActivityStore);
  const {  activity, loadActivity, loadingInitial, openEditForm, cancelSelectedActivity } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent content="Loading activity..." />
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button as={Link} to={`/editActivity/$(activity.id)`} basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" onClick={() => history.push('/activities')}/>
        </Button.Group>
      </Card.Content>
  </Card>
  )
});