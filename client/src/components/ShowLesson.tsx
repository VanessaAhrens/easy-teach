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
              <tr><th>description</th><th>duration</th><th>location</th><th>price</th><th>equip</th><th>language</th><th>amount of People</th><th>Email</th><th>about the Teacher</th></tr>
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
          lesson_name: "Tennis",
          lesson_duration:25,
          lesson_location: "Ingolstadt",
          lesson_price: 35,
          lesson_equip: "Tennisschläger und Tennisschuhe",
          lesson_language:"deutsch",
          lesson_amountPeople: "4",
          lesson_eMailTeacher: "primosch@mediamarktsaturn.com",
          lesson_aboutTeacher: "Hallo, ich bin der Tennistrainer.",
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
