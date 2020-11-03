import { action, computed, observable } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable activityRegistry = new Map();
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    console.log('create activity');
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log('create error: ', error);
      this.submitting = false
    }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.submitting = false;
    } catch (error) {
      console.log('edit error', error);
      this.submitting = false;
    }
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('.')[0]
        this.activityRegistry.set(activity.id, activity);
      });
      console.log('loading activities ', activities);
      this.loadingInitial = false;
    } catch (error) {
      console.log('load error: ', error);
      this.loadingInitial = false;
    }
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
    console.log('open form');
  }

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  }
}

export default createContext(new ActivityStore());