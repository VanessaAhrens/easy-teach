import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
import history from '../framework/history';

declare let window: IWindow;

export interface IErrorMessage extends IAction {
    errorMessage: string;
}

reducerFunctions[ActionType.login_error] = function (newState: IState, action: IErrorMessage) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = action.errorMessage;
    return newState
}
reducerFunctions[ActionType.user_logged_in] = function (newState: IState, action: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = "";
    newState.UI.loggedIn = true;
    newState.BM.user = action.user;
    return newState
}
reducerFunctions[ActionType.user_logged_out] = function (newState: IState, action: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = "";
    newState.UI.loggedIn = false;
    newState.BM.user = { lastname: "", firstname: "", username: "", password: "" };
    return newState
}

export default class Login extends Component {
    render() {
        if (window.CS.getUIState().loggedIn)
            return (
                <div>
                    <p>You are logged in as {window.CS.getBMState().user.username}</p>
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </div>
            )
        else
            return (
                <div className="row" style={{ marginTop: '50px' }} >
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input type="username" className="form-control" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>

                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-md-4"></div>
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p>{window.CS.getUIState().Login.errorMessage}</p>
                    </div>
                    <div className="col-md-4"></div>


                </div>
            )
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
        axios.post('/auth/login', window.CS.getBMState().user)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data.errorMessage) {
                    const uiAction: IErrorMessage = {
                        type: ActionType.login_error,
                        errorMessage: data.errorMessage
                    }
                    window.CS.clientAction(uiAction);
                } else {
                    const loggedinAction: IUserAction = {
                        type: ActionType.user_logged_in,
                        user: data as IUser
                    }
                    window.CS.clientAction(loggedinAction);
                    history.push("/");
                }
                console.log(window.CS.getUIState().loggedIn)
            });
    }
}
export const handleLogout = () => {
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
}