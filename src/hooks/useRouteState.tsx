import { useLocation } from 'react-router-dom';

export interface RouteState {
  fromCreate?: boolean;
  success?: boolean;
  message?: string;
}

export const useRouteState = () => {
  const location = useLocation();
  const historyState = location.state as RouteState | null;

  return {
    historyState,
    clearHistoryState: () => {
      window.history.replaceState({}, '');
    },
  };
};
