import { components } from './api';

export type Task = components['schemas']['Task'];
export type Tasks = Task[];
export type CreateTask = components['schemas']['CreateTask'];
export type UpdateTask = components['schemas']['UpdateTask'];
export type errorTask = components['schemas']['Error'] | string;
