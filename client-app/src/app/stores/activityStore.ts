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
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = '';

  // constructor is needed for decorators to work
  constructor() {
    makeObservable(this)
  }

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a,b) => a.date!.getTime() - b.date!.getTime()
    )
    return Object.entries(sortedActivities.reduce((activities, activity) => {
      const date = activity.date!.toISOString().split('T')[0];
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key: string]: IActivity[]}));
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action cancelSelectedActivity = () => {
    this.activity = null;
  }

  @action clearActivity = () => {
    this.activity = null;
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
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      console.log('edit error 0', error);
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
          activity.date = new Date(activity.date!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
      console.log(this.groupActivitiesByDate(activities));
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      })
      console.error(error);
    }
  }

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity) {
      this.activity = activity
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          activity.date = new Date(activity.date!);
          this.activity = activity;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        })
        console.error(error);
      }
    }
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = null;
  }

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  }
}

export default createContext(new ActivityStore());