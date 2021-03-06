import React, { Component, ChangeEvent } from 'react'
import { Button } from 'react-bootstrap';
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import { ILessonData, IState, IUser } from '../state/appState'
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';
import { IWindow } from '../framework/IWindow'

declare let window: IWindow;
interface IProps {
  edit: boolean;
}

interface IJSXState {
  edit_mode: boolean;
  username: string;
  lastname: string;
  firstname: string;
  password: string;
}
interface IUserAction extends IAction {
  user: IUser
}

reducerFunctions[ActionType.user_updated] = function (newState: IState, updateAction: IUserAction) {
  newState.BM.user.firstname = updateAction.user.firstname;
  newState.BM.user.lastname = updateAction.user.lastname;
  newState.BM.user.username = updateAction.user.username;
  newState.BM.user.password = updateAction.user.password;
  return newState;
 }

export default class EditProfile extends React.PureComponent<IProps, IJSXState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      edit_mode: false,
      username: '',
      firstname: "0",
      lastname: '',
      password: "0",
    }
    this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      edit_mode: props.edit,
      username: window.CS.getBMState().user.username,
      password: window.CS.getBMState().user.password,
      lastname: window.CS.getBMState().user.lastname,
      firstname: window.CS.getBMState().user.firstname,
    }
  }
  renderEditMode() {
    return (
      <div>
        <div>
        <form>
          <div className="row" style={{ marginTop: '50px' }} >
            <div className="col-md-2"></div>
            <div className="col-md-3 bg-info">
              <div className="col">
                <label htmlFor="firstName">First Name:</label>
                <input className="form-control" name="firstname" onChange={this.handleChange} value={this.state.firstname}></input>
              </div>

              <div className="col">
                <label htmlFor="lastName">Last Name:</label>
                <input className="form-control" name="lastname" onChange={this.handleChange} value={this.state.lastname}></input>
              </div>

              <div className="col">
                <label htmlFor="username">Username:</label>
                <input className="form-control" name="username" onChange={this.handleChange} value={this.state.username}></input>
              </div>
              
              <div className="col">
                <label htmlFor="password">Password:</label>
                <input className="form-control" name="password" onChange={this.handleChange} value="****"></input>
                <p> &nbsp;</p>
              </div>
            
            <div className="col-md-2"></div>
          </div>
          </div>
          
          <div className="col-md-7">
            <div className="d-flex justify-content-center" style={{ marginBottom: '5px' }}>
              <Button type="submit" onClick={this.saveProfile} style={{ marginTop: '5px' }} >Save</Button>
              </div>
          </div>
        </form> 

        </div>
          </div>
    )
  }


  renderViewMode() {
    return (
      <div>
 <div className="row d-flex justify-content-start" style={{ marginTop: '50px' }} >
  <div className="col-md-2"></div>
  <div className="col-md-2 bg-info">

      <div className="Edit">
      <div className="col">
          <p>Username: {window.CS.getBMState().user.username}</p>
      </div>

        <div className="Edit">
        <div className="col">
          <p>First Name: {window.CS.getBMState().user.firstname}</p>
        </div>

        <div className="Edit">
        <div className="col">
          <p>Last Name: {window.CS.getBMState().user.lastname}</p>
        </div>

        <div className="Edit">
        <div className="col">
          <p>Password: ************</p>
        </div>

        <div className="Edit">
        <div className="col">
          <p>Picture: </p>
          </div>
          </div>
          </div>
          </div></div></div></div>
          </div>
        <div className="row d-flex justify-content-start" style={{ marginTop: '10px' }}>
        <div className="col-md-2"></div>
        <button className="btn btn-primary" onClick={this.handleSwitchToEditMode}>Edit</button>
        
        <div className="row">
        <div className="col-md-2"></div>
        <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
        
     
 
    </div>
        
  </div>
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


  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    } as IJSXState);
  }


  saveProfile = (event: any) => {
    event.preventDefault();
    const aiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(aiAction);
    let user = JSON.parse(JSON.stringify(window.CS.getBMState().user))
    user.username = this.state.username;
    user.lastname = this.state.lastname;
    user.firstname = this.state.firstname;

    axios.put('/auth/user/update', user)
      .then(res => {
        console.log(res.data)
        const uiAction: IUserAction = {
          type: ActionType.user_updated,
          user: res.data
        }
        history.push('/');
        window.CS.clientAction(uiAction);

        console.log(res.data)
      });
  }

}

//



