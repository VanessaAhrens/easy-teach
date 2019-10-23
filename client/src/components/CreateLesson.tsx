import React, { Component } from 'react'
import { ILessonAction } from './ShowLesson';
import { ActionType, IAction } from '../framework/IAction';
import { ILessonData, IState } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';

import mongoose from 'mongoose';
declare let window: IWindow;

//import SimpleLesson from './SimpleLesson'

//this file defines the React component that renders a single lesson to the browser window
//it also contains the logic to change lesson properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps extends IAction  {
    lesson: ILessonData;
}

interface IJSXState {
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
    return newLesson;
}


export default class CreateLesson extends React.PureComponent<IProps, IJSXState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        
            return (
                <div>
                    <input className= "createLesson" id = "createName" type="text" name="name" value={this.props.lesson.lesson_name} onChange={this.handleNameChange} />
                    <input className= "createLesson" id = "createDuration" type="text" name="name" value={this.props.lesson.lesson_duration} onChange={this.handleDurationChange} />
                    <input className= "createLesson" id = "createLocation" type="text" name="name" value={this.props.lesson.lesson_location} onChange={this.handleLocationChange} />
                    <input className= "createLesson" id = "createPrice" type="text" name="name" value={this.props.lesson.lesson_price} onChange={this.handlePriceChange} />
                    <input className= "createLesson" id = "createEquip" type="text" name="name" value={this.props.lesson.lesson_equip} onChange={this.handleEquipChange} />
                    <input className= "createLesson" id = "createLanguage" type="text" name="name" value={this.props.lesson.lesson_language} onChange={this.handleLanguageChange} />
                    <input className= "createLesson" id = "createAmount" type="text" name="name" value={this.props.lesson.lesson_amountPeople} onChange={this.handleAmountPeopleChange} />
                    <input className= "createLesson" id = "createeMail" type="text" name="name" value={this.props.lesson.lesson_eMailTeacher} onChange={this.handleEmailTeacherChange} />
                    <input className= "createLesson" id = "createAbout" type="text" name="name" value={this.props.lesson.lesson_aboutTeacher} onChange={this.handleAboutTeacherChange} />
                    
                    <button onClick={this.handleSave} id={this.props.lesson._id}>save</button>
                    
                
                </div>
            )
        
    }
    
    handleNameChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_name = event.target.value
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleDurationChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_duration = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLocationChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_location = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handlePriceChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_price = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEquipChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_equip = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLanguageChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_language = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
            
        }
        window.CS.clientAction(action);
    }
    handleAmountPeopleChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_amountPeople = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEmailTeacherChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_eMailTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleAboutTeacherChange = (event: any) => {
        const newLesson = this.props.lesson;
        newLesson.lesson_aboutTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleSave = (event: any) => {
        this.handleCreateLesson();

        this.setState({ edit_mode: false });
        const uiAction: IAction = {
            type: ActionType.server_called
          }
          window.CS.clientAction(uiAction);
        axios.put('/lessons/update/' + this.props.lesson._id, this.props.lesson)
        .then(res => {
            console.log(res)
            const uiAction: IAction = {
                type: ActionType.lesson_updated
              }
              window.CS.clientAction(uiAction);
        });
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
          lesson_name: this.props.lesson.lesson_name,
          lesson_duration:this.props.lesson.lesson_duration,
          lesson_location: this.props.lesson.lesson_location,
          lesson_price: this.props.lesson.lesson_price,
          lesson_equip: this.props.lesson.lesson_equip,
          lesson_language:this.props.lesson.lesson_language,
          lesson_amountPeople: this.props.lesson.lesson_amountPeople,
          lesson_eMailTeacher: this.props.lesson.lesson_eMailTeacher,
          lesson_aboutTeacher: this.props.lesson.lesson_aboutTeacher,
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
