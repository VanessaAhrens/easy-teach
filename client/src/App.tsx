import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import ShowLessons from './components/ShowLesson';
import { Switch, Route } from 'react-router-dom';
import { IAction, ActionType } from './framework/IAction';
import { ILessonData, IState } from './state/appState'
import axios from 'axios';
import { reducerFunctions } from './reducer/appReducer';

import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number
}

export interface ILessonsLoadedAction extends IAction {
  lessons: ILessonData[]
}
reducerFunctions[ActionType.server_called] = function (newState: IState, action: IAction) {
  newState.UI.waitingForResponse = true;
  return newState;
}
reducerFunctions[ActionType.add_lessons_from_server] = function (newState: IState, action: ILessonsLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.lessons = action.lessons;
  return newState;
}
export default class App extends React.PureComponent<IProps> {

  componentDidMount() {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.get('/lessons/read').then(response => {
      console.log("this data was loaded as a result of componentDidMount:");
      console.log(response.data);
      const responseAction: ILessonsLoadedAction = {
        type: ActionType.add_lessons_from_server,
        lessons: response.data as ILessonData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })
  }

  render() {
    window.CS.log("App --> render()")
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/showlessons" component={ShowLessons} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </>
    );
  }

}
