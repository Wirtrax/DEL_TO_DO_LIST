import { Location, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskList from './components/TasksList/TaskList';
import UpdateFrom from './components/UpdateForm/UpdateTaskForm';
import CreateTaskFrom from './components/CreateTaskFrom/CreateTaskFrom';
import Modal from 'components/Modal/Modal';
import { PageContainer } from 'components/PageContainer';
import { useRouteState } from 'src/hooks/useRouteState';
import { RouteModalState } from 'types/routeState';
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { historyState } = useRouteState<RouteModalState>();
  const [backgroundLocation, setBackgroundLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (historyState?.modal) {
      setBackgroundLocation(historyState.background || null);
    } else {
      setBackgroundLocation(null);
    }
  }, [historyState]);

  const closeModal = () => {
    navigate(backgroundLocation || '/', {
      replace: true,
      state: null,
    });
  };

  return (
    <PageContainer>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<CreateTaskFrom />} />
        <Route path="/update/:id" element={<UpdateFrom />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/update/:id"
            element={
              <Modal onClose={closeModal}>
                <UpdateFrom />
              </Modal>
            }
          />
        </Routes>
      )}
    </PageContainer>
  );
}

export default App;
