import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Todo from './Todo'; // Импортируем созданный вами компонент Todo

const App = () => {
  return (
    <Provider store={store}>
      <Todo /> {/* Рендерим компонент Todo внутри провайдера Redux */}
    </Provider>
  );
};

export default App;