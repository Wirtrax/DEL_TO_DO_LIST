import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/taskList/integration/store';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const storeConf = store();
root.render(
  <StrictMode>
    <Provider store={storeConf}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
