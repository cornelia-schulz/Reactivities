import React, { useContext } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

const ActivityDashboard: React.FC = () => {

  const activityStore = useContext(ActivityStore);
  const { editMode, activity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <GridColumn width={6}>
        <h2>activity filters</h2>
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDashboard);