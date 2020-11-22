import { action, computed, configure, makeObservable, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

configure({enforceActions: 'always'});

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable activityRegistry = new Map();
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable submitting = false;
  @observable target = '';

  // constructor is needed for decorators to work
  constructor() {
    makeObservable(this)
  }

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
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction(() => {
        console.log('create error: ', error);
        this.submitting = false;
      })
    }
  }

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction(() => {
        console.log('delete error ', error);
        this.submitting = false;
        this.target = '';
      })
    }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction(() => {
        console.log('edit error', error);
        this.submitting = false;
      })
    }
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction(() => {
        console.log('load error: ', error);
        this.loadingInitial = false;
      })
    }
  }

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity) {
      this.selectedActivity = activity
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity', () => {
          this.selectedActivity = activity;
          this.loading = false;
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
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