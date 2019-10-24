import React, { ChangeEvent } from 'react'
import { ILessonAction } from './ShowLesson';
import { ActionType, IAction } from '../framework/IAction';
import { ILessonData, IState } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';

import mongoose from 'mongoose';
import { string } from 'prop-types';
declare let window: IWindow;

//import SimpleLesson from './SimpleLesson'

//this file defines the React component that renders a single lesson to the browser window
//it also contains the logic to change lesson properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...
interface IJSXState{
    lesson:{
    [key:string]:string|number;
    lesson_name: any;
    lesson_duration?:any;
    lesson_location?: any;
    lesson_price?: any;
    lesson_equip?: any;
    lesson_language?:any;
    lesson_amountPeople?: any;
    lesson_eMailTeacher?: any;
    lesson_aboutTeacher?: any;
    }
}

reducerFunctions[ActionType.lesson_updated] = function (newState: IState, updateAction: ILessonAction) {
    newState.UI.waitingForResponse=false;
}
reducerFunctions[ActionType.create_lesson] = function (newState: IState, updateAction: ILessonAction) {
    let newLesson: any = {
        lesson_name: updateAction.lesson.lesson_name,
        lesson_duration: updateAction.lesson.lesson_duration,
        lesson_location: updateAction.lesson.lesson_location,
        lesson_price: updateAction.lesson.lesson_price,
        lesson_equip: updateAction.lesson.lesson_equip,
        lesson_language: updateAction.lesson.lesson_language,
        lesson_amountPeople: updateAction.lesson.lesson_amountPeople,
        lesson_eMailTeacher: updateAction.lesson.lesson_eMailTeacher,
        lesson_aboutTeacher: updateAction.lesson.lesson_aboutTeacher
    };
    console.log(newLesson);
    return newLesson;
}


export default class CreateLesson extends React.Component<{},IJSXState> {
    state:IJSXState = {
        lesson: {
            lesson_name: '',
            lesson_duration: 0,
            lesson_location: '',
            lesson_price: 0,
            lesson_equip: '',
            lesson_language: '',
            lesson_amountPeople: '',
            lesson_eMailTeacher: '',
            lesson_aboutTeacher: ''
        }
    }

    render() {
        {console.log(this.state.lesson)}    
            return (
                <div>
                    <input className= "createLesson" id = "createName" type="text" name="lesson_name" value={this.state.lesson.lesson_name} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createDuration" type="text" name="lesson_duration" value={this.state.lesson.lesson_duration} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createLocation" type="text" name="lesson_location" value={this.state.lesson.lesson_location} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createPrice" type="text" name="lesson_price" value={this.state.lesson.lesson_price} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createEquip" type="text" name="lesson_equip" value={this.state.lesson.lesson_equip} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createLanguage" type="text" name="lesson_language" value={this.state.lesson.lesson_language} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createAmount" type="text" name="lesson_amountPeople" value={this.state.lesson.lesson_amountPeople} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createeMail" type="text" name="lesson_eMailTeacher" value={this.state.lesson.lesson_eMailTeacher} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createAbout" type="text" name="lesson_aboutTeacher" value={this.state.lesson.lesson_aboutTeacher} onChange={this.handleChange} />
                    
                    <button onClick={this.handleSave}>save</button>
                    
                
                </div>
            )
        
    }
    
    handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        const name = target.name as string;
        let newLesson = this.state.lesson;
        newLesson[name] = target.value;
        this.setState({
            lesson: newLesson
        });
    }

    handleSave = () => {
        const uiAction: IAction = {
          type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        const newLesson: ILessonData = {
          _id: mongoose.Types.ObjectId().toString(),
          ...this.state.lesson
        }
        const action: ILessonAction = {
            type: ActionType.create_lesson,
            lesson: newLesson
          }
        axios.post('/lessons/add', newLesson)
        .then(res => {
          window.CS.clientAction(action);
          console.log(res.data._id, res.data)
        });
      }
}
