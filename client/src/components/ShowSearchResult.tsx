import React, { Component } from 'react'

import SimpleLesson from './SimpleLesson'
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import { ILessonData, IState } from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;


export default class ShowLessons extends Component {

  handleQuery = (searchQuery: string) => {
    axios.post('/lessons/search', searchQuery).then(response => {
      console.log(response.data);
    });
  }
  render() {
    return (
        <div>
      <p> {window.CS.getUIState().waitingForResponse.toString()}{window.CS.getUIState().counter}</p>
      <h1>simple lesson management application</h1>
      <table>
        <tbody>
          <tr><th>description</th><th>duration</th><th>location</th><th>price</th><th>equip</th><th>language</th><th>amount of People</th><th>Email</th><th>about the Teacher</th></tr>
          {window.CS.getBMState().lessons.map(data => <SimpleLesson key={data._id} lesson={data} edit={false} />)}
        </tbody>
      </table>
    </div>
    )
}  
}