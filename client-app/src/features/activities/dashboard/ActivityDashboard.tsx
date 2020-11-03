import React, { SyntheticEvent, useContext } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityDetails from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';


interface IProps {
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  deleteActivity,
  target
}) => {

  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          target={target}
        />
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity!}
            key={(selectedActivity && selectedActivity.id) || 0}
          />
        )}
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDashboard);