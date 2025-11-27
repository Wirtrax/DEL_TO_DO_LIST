import { useLocation, useNavigate } from 'react-router-dom';

export const useRouteState = <T>() => {
  const location = useLocation();
  const navigate = useNavigate();
  const historyState = location.state as T | null;

  return {
    historyState,
    clearHistoryState: () => {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    },
  };
};
