import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { IUserAction } from './components/Register';
import { IState, IUser } from './state/appState'
import { ActionType, IAction } from './framework/IAction';
import history from './framework/history';
//import framework components
//CS: ClientServices, we will use them a lot, so to shorten the code they are just called: CS
import { CS } from './framework/CS';
//we will add a CS instance to the window object.
//We also want the window object strictly typed, so we declare that window has the type "IWindow"
import { IWindow } from './framework/IWindow'
import Axios from 'axios';
declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State macht store 
window.CS.initializeStore();

Axios.get('/auth/isloggedin').then(response => {
  console.log(response)
  if(response.data.currentUser) {
    const loggedinAction: IUserAction = {
      type: ActionType.user_logged_in,
      user: response.data.currentUser as IUser
    }
    window.CS.clientAction(loggedinAction);
  }
})

//now we can render this state to the DOM using React
ReactDOM.render(
  <Router history={history}>
  <App stateCounter={window.CS.getUIState().counter} />
  </Router>
, document.getElementById('root'));


//whenever there is a new state, we render the whole virtual DOM again
//React will take care that only the differences from the previous and
//the current virtual DOM will be rendered to the browser DOM
window.CS.getStore().subscribe(() => {
  window.CS.log("3. before render ---------------------------------------------");
  ReactDOM.render(<Router history={history}>
                  <App stateCounter={window.CS.getUIState().counter} />
                  </Router>, document.getElementById('root'));
  window.CS.log("3. after render ---------------------------------------------");
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
