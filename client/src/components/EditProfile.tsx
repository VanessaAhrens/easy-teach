import React, { Component } from 'react'
import './EditProfile.css';
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import {ILessonData,IState} from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';
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

export default class EditProfile extends Component {
  render() {

      if (window.CS.getUIState().loggedIn)
      return (
          <div>
            <div className="Edit">
            <p>Username: {window.CS.getBMState().user.username}</p>

            </div>
            <div className="Edit">
            <p>First Name: {window.CS.getBMState().user.firstname}</p>

            </div>
            <div className="Edit">
            <p>Last Name: {window.CS.getBMState().user.lastname}</p>

            </div>
            <div className="Edit">
            <p>Password: ************</p>

            </div>
            <div className="Edit">
            <p>Picture: </p>

            </div>
             
            <button className="EditButton" onClick={this.handleSwitchToEditMode}>Edit</button>
              <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
          </div>
      )
  else
      return (
          <div>
              You are not logged in. Please login first, before you change your profile.
          </div>
      )
  }

  handleLogout() {
    const uiAction: IAction = {
        type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.get('/auth/logout').then(res => {
        const loggedoutAction: IAction = {
            type: ActionType.user_logged_out
        }
        window.CS.clientAction(loggedoutAction);
    }
    
    );
    history.push('/')
  }

  handleSwitchToEditMode() {
    this.setState({ edit_mode: true });
}
}

//



/*

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

}*/