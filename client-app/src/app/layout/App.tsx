import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import { ActivityDetails }  from '../../features/activities/details/ActivityDetails';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from './LoadingComponent';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { ActivityForm } from '../../features/activities/form/ActivityForm';


const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{marginTop: '7em'}}>   
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            {/* the location key changes when a route changes and we want to use it to rerender the component completely when the route changes */}
            <Route key={location.key} path={['/createActivity', '/editActivity/:id']} component={ActivityForm} />
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );
}

export default withRouter(observer(App));
