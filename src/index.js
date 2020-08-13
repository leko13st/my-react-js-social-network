import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import App from './App';
import store from './State/state';

//функция перерисовки UI
let RerenderApp = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={store.getState()} 
           dispatch={store.dispatch.bind(store)}
           />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

//Изначальная отрисовка UI
RerenderApp(store.getState());
//Отправка функции перерисовки в state => нет цикличной зависимости с import/export (класс!)
store.subscriber(RerenderApp)

export default RerenderApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
