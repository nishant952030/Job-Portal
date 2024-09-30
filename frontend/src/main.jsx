import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistStore } from 'redux-persist'; // Import persistStore

// Persistor object to manage the rehydration process
const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Wrap the App with PersistGate to handle persisted store */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
