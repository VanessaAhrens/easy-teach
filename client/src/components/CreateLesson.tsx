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
    [key:number]:string|number;
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

reducerFunctions[ActionType.lesson_updated] = function (newState: IState, updateAction: ILessonAction) {
    newState.UI.waitingForResponse=false;
}
reducerFunctions[ActionType.update_lesson] = function (newState: IState, updateAction: ILessonAction) {
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


export default class CreateLesson extends React.PureComponent<{},IJSXState> {
    state = {
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
        console.log(this.handleNameChange)
            return (
                
                <div>
                    <input className= "createLesson" id = "createName" type="text" name="lesson_name" value={this.state.lesson.lesson_name} onChange={this.handleChange} />
                    <input className= "createLesson" id = "createDuration" type="text" name="lesson_duration" value={this.state.lesson.lesson_duration} onChange={this.handleDurationChange} />
                    <input className= "createLesson" id = "createLocation" type="text" name="lesson_location" value={this.state.lesson.lesson_location} onChange={this.handleLocationChange} />
                    <input className= "createLesson" id = "createPrice" type="text" name="lesson_price" value={this.state.lesson.lesson_price} onChange={this.handlePriceChange} />
                    <input className= "createLesson" id = "createEquip" type="text" name="lesson_equip" value={this.state.lesson.lesson_equip} onChange={this.handleEquipChange} />
                    <input className= "createLesson" id = "createLanguage" type="text" name="lesson_language" value={this.state.lesson.lesson_language} onChange={this.handleLanguageChange} />
                    <input className= "createLesson" id = "createAmount" type="text" name="lesson_amountPeople" value={this.state.lesson.lesson_amountPeople} onChange={this.handleAmountPeopleChange} />
                    <input className= "createLesson" id = "createeMail" type="text" name="lesson_eMailTeacher" value={this.state.lesson.lesson_eMailTeacher} onChange={this.handleEmailTeacherChange} />
                    <input className= "createLesson" id = "createAbout" type="text" name="lesson_aboutTeacher" value={this.state.lesson.lesson_aboutTeacher} onChange={this.handleAboutTeacherChange} />
                    
                    <button onClick={this.handleSave} id={this.state.lesson.lesson_name}>save</button>
                    
                
                </div>
            )
        
    }
    
    handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        const name = target.name as string;
        let changedState = this.state.lesson[name];
    }

    handleNameChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_name = event.target.value
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleDurationChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_duration = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLocationChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_location = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handlePriceChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_price = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEquipChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_equip = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLanguageChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_language = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
            
        }
        window.CS.clientAction(action);
    }
    handleAmountPeopleChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_amountPeople = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEmailTeacherChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_eMailTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleAboutTeacherChange = (event: any) => {
        const newLesson = this.state.lesson;
        newLesson.lesson_aboutTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleSave = (event: any) => {
        this.handleCreateLesson();
        const uiAction: IAction = {
            type: ActionType.server_called
          }
          window.CS.clientAction(uiAction);
        /*axios.put('/lessons/update/' + this.state.lesson._id, this.state.lesson)
        .then(res => {
            console.log(res)
            const uiAction: IAction = {
                type: ActionType.lesson_updated
              }
              window.CS.clientAction(uiAction);
        });*/
    }
    
    handleRerenderTest = (event: any) => {
        const action: IAction = {
            type: ActionType.render_test,
        }
        window.CS.clientAction(action);
    }


    handleCreateLesson = () => {
        console.log("handleCreateLesson invoked");
        const uiAction: IAction = {
          type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        const newLesson: ILessonData = {
          _id: mongoose.Types.ObjectId().toString(),
          lesson_name: this.state.lesson.lesson_name,
          lesson_duration:this.state.lesson.lesson_duration,
          lesson_location: this.state.lesson.lesson_location,
          lesson_price: this.state.lesson.lesson_price,
          lesson_equip: this.state.lesson.lesson_equip,
          lesson_language:this.state.lesson.lesson_language,
          lesson_amountPeople: this.state.lesson.lesson_amountPeople,
          lesson_eMailTeacher: this.state.lesson.lesson_eMailTeacher,
          lesson_aboutTeacher: this.state.lesson.lesson_aboutTeacher,
        }
        console.log(newLesson);
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
