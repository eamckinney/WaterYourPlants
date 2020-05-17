import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';

const { persistor, store } = ConfigureStore();


export default function App() {
  return (
      <Provider store={store}>
          <PersistGate
              persistor={persistor}>
              <Main />
          </PersistGate>
      </Provider>
  );
}

console.disableYellowBox = true;
