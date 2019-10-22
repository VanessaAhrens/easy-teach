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
    lessonToChange[0].lesson_value = updateAction.lesson.lesson_value;
    return newState;
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
        this.handleValueChange = this.handleValueChange.bind(this);
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
                    <td><input type="number" name="value" value={this.props.lesson.lesson_value} onChange={this.handleValueChange} /> €</td>
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
                    <td>{this.props.lesson.lesson_value} €</td>
                    <td>{this.props.lesson.lesson_duration} €</td>
                    <td>{this.props.lesson.lesson_location} €</td>
                    <td>{this.props.lesson.lesson_price} €</td>
                    <td>{this.props.lesson.lesson_equip} €</td>
                    <td>{this.props.lesson.lesson_language} €</td>
                    <td>{this.props.lesson.lesson_amountPeople} €</td>
                    <td>{this.props.lesson.lesson_eMailTeacher} €</td>
                    <td>{this.props.lesson.lesson_aboutTeacher} €</td>

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
    handleValueChange(event: any) {
        const newLesson = this.props.lesson;
        newLesson.lesson_value = event.target.value;
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