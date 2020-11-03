import React, { Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import ActivityStore from '../stores/activityStore'
import { LoadingComponent } from './LoadingComponent';
import { observer } from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore)
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false))
  }

  useEffect(() => {
    activityStore.loadActivities();
    console.log('here')
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          deleteActivity={handleDeleteActivity}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
