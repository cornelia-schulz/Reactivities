import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from './LoadingComponent';


const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
    console.log('loading activities');
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <h1>Hello {activityStore.editMode}</h1>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
