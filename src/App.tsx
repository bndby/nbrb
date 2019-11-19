import React from 'react';
import store from '../store';
import {Provider} from 'mobx-react';
import Menu from './Menu';

const App = () => {
  //
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export default App;
