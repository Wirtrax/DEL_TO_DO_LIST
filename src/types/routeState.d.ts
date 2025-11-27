import { Location } from 'react-router-dom';

export interface RouteNotoficationState {
  fromCreate?: boolean;
  success?: boolean;
  message?: string;
}

export interface RouteModalState {
  modal?: boolean;
  background?: Location | null;
  taskId?: number;
}
