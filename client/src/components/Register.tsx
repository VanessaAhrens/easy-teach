import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';

declare let window: IWindow;

export interface IUserAction extends IAction {
    user: IUser
}

reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: IUserAction) {
    console.log(updateAction.user);
    newState.BM.user = updateAction.user;
    return newState
}
reducerFunctions[ActionType.user_created] = function (newState: IState, updateAction: IUserAction) {
    console.log(updateAction.user);
    newState.UI.waitingForResponse = false;
    newState.UI.loggedIn = true;
    return newState
}
export default class Register extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div className="row" style={{ marginTop: '50px' }} >
                        <div className="col-md-4"></div>
                        <div className="col-md-4 bg-light">
                            <div className="col">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" onChange={this.handleFirstnameChange} value={window.CS.getBMState().user.firstname} className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <label htmlFor="lastname">Last name:</label>
                                <input type="text" onChange={this.handleLastnameChange} value={window.CS.getBMState().user.lastname} className="form-control" placeholder="Last name" />
                            </div>
                            <div className="col">
                                <label htmlFor="username">Username</label>
                                <input type="text" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} className="form-control" placeholder="Username" />
                            </div>
                            <div className="col">
                                <label htmlFor="password">Password</label>
                                <input type="text" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} className="form-control" placeholder="Password" />
                                <br/>
                            </div>
                        </div>
                        <div className="col-md-4"></div>

                    </div>
                    <div className="row" style={{ marginTop: '50px' }}>
                        <div className="col-md-5"></div>
                        <input className="btn btn-primary" type="submit" value="Register as new User" />
                    </div>
                </form>
            </div>
        )
    }

    handleFirstnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.firstname = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleLastnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.lastname = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleUsernameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.username = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handlePasswordChange(event: any) {
        let user = window.CS.getBMState().user;
        user.password = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
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
    }
}
