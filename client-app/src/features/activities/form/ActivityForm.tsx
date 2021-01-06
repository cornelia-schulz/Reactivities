import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from '../../../app/models/activity';
// import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

interface DetailParams {
  id: string
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = observer(({history, match}) => {
  const activityStore = useContext(ActivityStore);
  const { activity: initialFormState, cancelFormOpen, clearActivity, loadActivity, submitting } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

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

  // const handleSubmit = () => {
  //   if(activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
  //   } else {
  //     editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({handleSubmit}) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                />
                <Field
                  component={TextAreaInput}
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                />
                <Field
                component={SelectInput}
                  name="category"
                  options={category}
                  placeholder="Category"
                  value={activity.category}
                />
                <Field
                  component={DateInput}
                  name="date"
                  placeholder="Date"
                  value={activity.date}
                />
                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={activity.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
});
