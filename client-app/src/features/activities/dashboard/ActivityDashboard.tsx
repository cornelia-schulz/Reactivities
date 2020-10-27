import React, { SyntheticEvent, useContext } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';


interface IProps {
  activities: IActivity[];
  createActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  editActivity: (activity: IActivity) => void;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  createActivity,
  deleteActivity,
  editActivity,
  setEditMode,
  setSelectedActivity,
  submitting,
  target
}) => {

  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity!}
            createActivity={createActivity}
            editActivity={editActivity}
            key={selectedActivity && selectedActivity.id || 0}
            setEditMode={setEditMode}
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDashboard);