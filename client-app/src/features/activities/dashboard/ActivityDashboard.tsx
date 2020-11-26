import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';

const ActivityDashboard: React.FC = () => {

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