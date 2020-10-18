import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'

interface IProps {
  activities: IActivity[];
  editMode: boolean;
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  editMode,
  selectActivity,
  selectedActivity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />
        )}
        {editMode && 
          <ActivityForm setEditMode={setEditMode} />
        }
      </GridColumn>
    </Grid>
  )
}
