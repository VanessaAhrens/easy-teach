import React, { Component } from 'react'

import SimpleLesson from './SimpleLesson'
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import {ILessonData,IState} from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';

import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps{};
interface IJSXState { };
export interface ILessonAction extends IAction {
  lesson: ILessonData
}
reducerFunctions[ActionType.create_lesson] = function (newState: IState, action: ILessonAction) {
  newState.BM.lessons.push(action.lesson);
  newState.UI.waitingForResponse=false;
  return newState;
}

export default class ShowLessons extends Component<IProps, IJSXState> {
    constructor(props: any) {
        console.log("new App component will be initialized");
        super(props);
        this.handleCreateLesson = this.handleCreateLesson.bind(this);
      }
    render() {
        return (
            <div>
          <p> {window.CS.getUIState().waitingForResponse.toString()}{window.CS.getUIState().counter}</p>
          <h1>simple lesson management application</h1>
          <p>to create a new lesson click this button:&nbsp;
            <button onClick={this.handleCreateLesson}>create lesson</button>
          </p>
          <table>
            <tbody>
              <tr><th>description</th><th>value</th><th>action</th></tr>
              {window.CS.getBMState().lessons.map(lesson => <SimpleLesson key={lesson._id} lesson={lesson} edit={false} />)}
            </tbody>
          </table>
        </div>
        )
    }
    handleCreateLesson() {
        console.log("handleCreateLesson invoked");
        const uiAction: IAction = {
          type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        const newLesson: ILessonData = {
          _id: mongoose.Types.ObjectId().toString(),
          lesson_name: "",
          lesson_value: 0,
          lesson_duration:0,
          lesson_location: "",
          lesson_price: 0,
          lesson_equip: "",
          lesson_language:"",
          lesson_amountPeople: "",
          lesson_eMailTeacher: "",
          lesson_aboutTeacher: "",
        }
        const action: ILessonAction = {
          type: ActionType.create_lesson,
          lesson: newLesson
        }
        axios.post('/lessons/add', newLesson)
        .then(res => {
          window.CS.clientAction(action);
          console.log(res.data)
        });
      }
}
