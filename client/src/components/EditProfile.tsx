import React, { Component, ChangeEvent } from 'react'
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import { ILessonData, IState, IUser } from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';
import { IWindow } from '../framework/IWindow'
import { Button } from 'react-bootstrap';

declare let window: IWindow;
interface IProps {
  edit: boolean;
}

interface IJSXState {
  edit_mode: boolean;
  user: IUser;
}

interface IUserAction extends IAction {
  user: IUser
}

reducerFunctions[ActionType.user_updated] = function (newState: IState, updateAction: IUserAction) {
  console.log(updateAction.user);
  newState.BM.user = updateAction.user;
  return newState
}

export default class EditProfile extends React.PureComponent<IProps, IJSXState> {

  constructor(props: IProps) {
    super(props);

    this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      edit_mode: props.edit,
      user: window.CS.getBMState().user
    }
  }
  renderEditMode() {
    return (
      <div>
        <div className="RealEdit"><div>First Name: </div>
          <input name="handleFirstName" onChange={this.handleChange} value={this.state.user.firstname}></input>

        </div>
        <div className="RealEdit"><div>Last Name: </div>
          <input name="handleLastName" onChange={this.handleChange} value={this.state.user.lastname}></input>

        </div>
        <div className="RealEdit"><div>Username: </div>
          <input name="handleUserName" onChange={this.handleChange} value={this.state.user.username}></input>

        </div>
        <div className="RealEdit"><div>Password</div>
          <input name="handlePassword" onChange={this.handleChange} value="****"></input>
        </div>
          <Button type="submit" onClick={this.saveProfile} >Save</Button>
          
    
      </div>
    )
  }
  renderViewMode() {
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

        <button className="btn btn-primary" onClick={this.handleSwitchToEditMode}>Edit</button>
        <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
  render() {
    //|| true  weg nach fake
    console.log(window.CS.getUIState().loggedIn)
    if (window.CS.getUIState().loggedIn) {
      //|| !=true  weg nach fake und == true
      if (this.state.edit_mode == true) return this.renderEditMode();
      else return this.renderViewMode();
    }

    else {
      return (
        <div>
          You are not logged in. Please login first, before you change your profile.
        </div>
      )
    }
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

  handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const name = target.name as string;
    let newUser = this.state.user;
    this.setState({
      user: newUser
    });
  }


  saveProfile = (event: any) => {
    event.preventDefault();
    const aiAction: IAction = {
      type: ActionType.server_called
    }
  window.CS.clientAction(aiAction);
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post('/auth/signup', window.CS.getBMState().user)
            .then(res => {
                const uiAction: IAction = {
                    type: ActionType.user_updated
                }
                history.push('/');
                window.CS.clientAction(uiAction);

                console.log(res.data)
            });

}}

//
/*
handleSubmit(event: any) {
        event.preventDefault();
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post('/auth/signup', window.CS.getBMState().user)
            .then(res => {
                const uiAction: IAction = {
                    type: ActionType.user_created
                }
                history.push('/');
                window.CS.clientAction(uiAction);

                console.log(res.data)
            });
    }*/


