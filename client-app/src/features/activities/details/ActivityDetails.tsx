import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import { ActivityDetailedChat } from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import { ActivityDetailedInfo } from './ActivityDetailedInfo';
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar';

// create this, so you tell route component props exactly what is in match
interface DetailParams {
  id: string
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = observer(({history, match}) => {

  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial} = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id])

  if (loadingInitial || !activity) return <LoadingComponent content="Loading activity..." />
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
});