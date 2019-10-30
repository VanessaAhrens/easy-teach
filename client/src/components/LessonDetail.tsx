import React, { Component } from 'react';
import { IWindow } from '../framework/IWindow';

import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import history from '../framework/history';

export interface ISearchResultAction extends IAction {
    data: Object;
}


declare let window: IWindow;

interface IProps {
    location: any,
    history: any,
    match: any
}

interface IState {
    email: string;
    subject: string;
    message: string;
}

export default class LessonDetail extends React.Component<IProps, IState>  {
    constructor(props: any) {
        super(props)
        let lesson = window.CS.getBMState().searchResult.filter((item: any) => this.props.match.params.id === item._id)
        this.state = {
            email: lesson[0] ? lesson[0].lesson_eMailTeacher : "",
            subject: lesson[0] ? `${lesson[0].lesson_name} in ${lesson[0].lesson_location}` : "",
            message: "Hi, I would like to attend your lesson"
        }
    }

    handleQuery = () => {
        history.push('/searchresult');
    }
    emailHandler = (e: any) => {
        e.preventDefault();
        axios.post('/lessons/email', this.state)
    }
    changeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as IState)
    }
    render() {
        const lessonToRender = window.CS.getBMState().searchResult.filter((item: any) => this.props.match.params.id === item._id);
        return (
            <div>
                <div className="col-md-4"></div>
                <div className="row"></div>

                <div>

                    {lessonToRender.length != 0 ? <><h1>{lessonToRender[0].lesson_name}</h1>
                        <p>Location: {lessonToRender[0].lesson_location}</p>
                        <p>Price per Session: {lessonToRender[0].lesson_price} EUR</p>
                        <p>Duration: {lessonToRender[0].lesson_duration} min</p>
                        <p>Needed Equipment: {lessonToRender[0].lesson_equip}</p>
                        <p>Teaching Language: {lessonToRender[0].lesson_language}</p>
                        <p>Number of participants: {lessonToRender[0].lesson_amountPeople}</p>
                        <p>About me: {lessonToRender[0].lesson_aboutTeacher}</p>
                        <p>Send email to: {lessonToRender[0].lesson_eMailTeacher}</p>
                        <form onSubmit={(e) => this.emailHandler(e)}>
                            <input type="text" name="subject" value={this.state.subject} onChange={this.changeHandler} />
                            <textarea name="message" value={this.state.message} onChange={this.changeHandler} />
                            <button type="submit">Send</button>
                        </form>
                        <div className=" col-md-4 col-xs-4" >
                            <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
                        </div>
                    </>
                        : <div className="row d-flex justify-content-start" style={{ marginTop: '50px' }} >
                            <div className="col-md-2"></div>
                            <div className="col-md-6 ">
                                <div className="jumbotron bg-info">
                                    <div className="container ">
                                        <h1 className="display-4">Sorry!</h1>
                                        <p className="lead">Please return to search and try again.</p>
                                    </div></div>
                            </div>
                        </div>}

                </div>
            </div>
        )
    }
}