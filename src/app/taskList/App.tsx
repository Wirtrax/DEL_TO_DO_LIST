import { Route, Routes } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import TaskList from './components/TasksList/TaskList';
import UpdateFrom from './components/UpdateForm/UpdateTaskForm';
import CreateTaskFrom from './components/CreateTaskFrom/CreateTaskFrom';
import Modal from 'components/Modal/Modal';
import { PageContainer } from 'components/PageContainer';
function App() {
  return (
    <PageContainer>
      {/*

      <Modal
        onClose={() => {
          return 0;
        }}>
        <UpdateFrom></UpdateFrom>
      </Modal> */}

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<CreateTaskFrom />} />
      </Routes>
    </PageContainer>
  );
}

export default App;
