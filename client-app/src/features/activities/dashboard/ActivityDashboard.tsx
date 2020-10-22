import React, { SyntheticEvent } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'

interface IProps {
  activities: IActivity[];
  editMode: boolean;
  createActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  editActivity: (activity: IActivity) => void;
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  submitting: boolean;
  target: string;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  editMode,
  createActivity,
  deleteActivity,
  editActivity,
  selectActivity,
  selectedActivity,
  setEditMode,
  setSelectedActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
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
