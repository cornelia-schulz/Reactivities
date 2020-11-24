import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import { ActivityDetails }  from '../../features/activities/details/ActivityDetails';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from './LoadingComponent';
import { Route } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { ActivityForm } from '../../features/activities/form/ActivityForm';


const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>   
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route path={['/createActivity', '/editActivity/:id']} component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
