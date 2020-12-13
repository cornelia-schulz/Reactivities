import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = observer(({history, match}) => {
  const activityStore = useContext(ActivityStore);
  const { activity: initialFormState, cancelFormOpen, clearActivity, createActivity, editActivity, loadActivity, submitting } = activityStore;
  const initialiseForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initialiseForm);

  useEffect(() => {
    if (match.params.id && activity.id.length > 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity()
    }
  }, [activity.id.length, clearActivity, initialFormState, loadActivity, match.params.id])

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    // destructure event, so we can now use just name and value rather than event.target.name
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="title"
              onChange={handleInputChange}
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
              rows={2}
              value={activity.description}
            />
            <Form.Input
              name="category"
              onChange={handleInputChange}
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              name="date"
              onChange={handleInputChange}
              placeholder="Date"
              type="datetime-local"
              value={activity.date}
            />
            <Form.Input
              name="city"
              onChange={handleInputChange}
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              name="venue"
              onChange={handleInputChange}
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              content="Submit"
              floated="right"
              loading={submitting}
              positive type="submit"
            />
            <Button
              content="Cancel"
              floated="right"
              onClick={cancelFormOpen}
              type="button"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
    
  );
});
