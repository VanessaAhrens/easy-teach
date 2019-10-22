import React from 'react';
import { ILessonAction } from './ShowLesson';
import { ActionType, IAction } from '../framework/IAction';
import { ILessonData, IState } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
declare let window: IWindow;

//this file defines the React component that renders a single lesson to the browser window
//it also contains the logic to change lesson properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
    edit: boolean;
    lesson: ILessonData;
}

interface IJSXState {
    edit_mode: boolean;
}

reducerFunctions[ActionType.lesson_updated] = function (newState: IState, updateAction: ILessonAction) {
    newState.UI.waitingForResponse=false;
}
reducerFunctions[ActionType.update_lesson] = function (newState: IState, updateAction: ILessonAction) {
    let lessonToChange: ILessonData[] = newState.BM.lessons.filter(lesson => lesson._id === updateAction.lesson._id)
    console.log(lessonToChange);
    lessonToChange[0].lesson_name = updateAction.lesson.lesson_name;
    lessonToChange[0].lesson_duration = updateAction.lesson.lesson_duration;
    lessonToChange[0].lesson_location = updateAction.lesson.lesson_location;
    lessonToChange[0].lesson_price = updateAction.lesson.lesson_price;
    lessonToChange[0].lesson_equip = updateAction.lesson.lesson_equip;
    lessonToChange[0].lesson_language = updateAction.lesson.lesson_language;
    lessonToChange[0].lesson_amountPeople = updateAction.lesson.lesson_amountPeople;
    lessonToChange[0].lesson_eMailTeacher = updateAction.lesson.lesson_eMailTeacher;
    lessonToChange[0].lesson_aboutTeacher = updateAction.lesson.lesson_aboutTeacher;
    return lessonToChange;
}
reducerFunctions[ActionType.delete_lesson] = function (newState: IState, deleteAction: ILessonAction) {
    let lessonsToKeep: ILessonData[] = newState.BM.lessons.filter(lesson => lesson._id !== deleteAction.lesson._id)
    newState.BM.lessons = lessonsToKeep;
    return newState;
}


export default class SimpleLesson extends React.PureComponent<IProps, IJSXState> {

    constructor(props: IProps) {
        super(props);

        this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleEquipChange = this.handleEquipChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleAmountPeopleChange = this.handleAmountPeopleChange.bind(this);
        this.handleEmailTeacherChange = this.handleEmailTeacherChange.bind(this);
        this.handleAboutTeacherChange = this.handleAboutTeacherChange.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.handleRerenderTest = this.handleRerenderTest.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            edit_mode: props.edit,
        }
    }

    render() {

        //if the component is in edit mode, it will render different than if it just shows the data
        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_name} onChange={this.handleNameChange} /></td>
                    <td><input type="text" name="duration" value={this.props.lesson.lesson_duration} onChange={this.handleDurationChange} /></td>
                    <td><input type="text" name="location" value={this.props.lesson.lesson_location} onChange={this.handleLocationChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_price} onChange={this.handlePriceChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_equip} onChange={this.handleEquipChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_language} onChange={this.handleLanguageChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_amountPeople} onChange={this.handleAmountPeopleChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_eMailTeacher} onChange={this.handleEmailTeacherChange} /></td>
                    <td><input type="text" name="name" value={this.props.lesson.lesson_aboutTeacher} onChange={this.handleAboutTeacherChange} /></td>

                    <td>
                        <button onClick={this.handleSave} id={this.props.lesson._id}>save</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter</button>
                    </td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.props.lesson.lesson_name}</td>
                    <td>{this.props.lesson.lesson_duration} Minuten</td>
                    <td>{this.props.lesson.lesson_location} </td>
                    <td>{this.props.lesson.lesson_price} €</td>
                    <td>{this.props.lesson.lesson_equip} </td>
                    <td>{this.props.lesson.lesson_language} </td>
                    <td>{this.props.lesson.lesson_amountPeople} </td>
                    <td>{this.props.lesson.lesson_eMailTeacher} </td>
                    <td>{this.props.lesson.lesson_aboutTeacher} </td>

                    <td>
                        <button onClick={this.handleSwitchToEditMode}>edit</button>
                        <button onClick={this.handleDelete} id={this.props.lesson._id}>sell or dispose</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter {window.CS.getUIState().counter}</button>
                    </td>
                </tr>
            )
    }
    handleSwitchToEditMode() {
        this.setState({ edit_mode: true });
    }
    handleNameChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_name = event.target.value
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleDurationChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_duration = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLocationChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_location = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handlePriceChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_price = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEquipChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_equip = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleLanguageChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_language = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
            
        }
        window.CS.clientAction(action);
    }
    handleAmountPeopleChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_amountPeople = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleEmailTeacherChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_eMailTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleAboutTeacherChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_aboutTeacher = event.target.value;
        const action: ILessonAction = {
            type: ActionType.update_lesson,
            lesson: newLesson
        }
        window.CS.clientAction(action);
    }
    handleSave(event: any) {
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
    handleDelete() {
        const uiAction: IAction = {
            type: ActionType.server_called
          }
          window.CS.clientAction(uiAction);
          axios.post('/lessons/delete/' + this.props.lesson._id)
          .then(res => {
            const action: ILessonAction = {
                type: ActionType.delete_lesson,
                lesson: this.props.lesson
            }
            window.CS.clientAction(action)
          });
    }
    handleRerenderTest(event: any) {
        const action: IAction = {
            type: ActionType.render_test,
        }
        window.CS.clientAction(action);
    }
}

