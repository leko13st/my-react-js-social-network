import React from 'react';
import ReactDOM from 'react-dom';
import { MainApp } from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


//функция перерисовки UI
//let RerenderApp = (state) => {
  ReactDOM.render(
      <MainApp />,
    document.getElementById('root')
  );
//}

// //Изначальная отрисовка UI
// RerenderApp(store.getState());
// //Отправка функции перерисовки в state => нет цикличной зависимости с import/export (класс!)
// store.subscribe(() => {
//   let state = store.getState();
//   RerenderApp(state);
// });

//export default RerenderApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
