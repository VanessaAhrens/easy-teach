import React, { Component } from 'react';
import { IWindow } from '../framework/IWindow';
import { ILessonData, IUser } from '../state/appState'
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import history from '../framework/history';

export interface ISearchResultAction extends IAction {
    data: Object;
}

interface IUserAction extends IAction {
    user: IUser
}

declare let window: IWindow;

interface IProps {
    location: any,
    history: any,
    match: any
}

interface IState {
    lessonToRender: any,
    email: string;
    subject: string;
    message: string;
    rating: number;
    id: string;
}

export default class LessonDetail extends React.Component<IProps, IState>  {
    constructor(props: any) {
        super(props)
        let id = window.CS.getBMState().user as any;
        let lessonToRender = window.CS.getBMState().searchResult.filter((item: any) => this.props.match.params.id === item._id);
        this.state = {
            id: id._id,
            lessonToRender: lessonToRender[0] ? lessonToRender[0] : null,
            email: lessonToRender[0] ? lessonToRender[0].lesson_eMailTeacher : "",
            subject: lessonToRender[0] ? `${lessonToRender[0].lesson_name} in ${lessonToRender[0].lesson_location}` : "",
            message: "Hi, I would like to attend your lesson",
            rating: 10
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
    changeHandlerInt = (e: any) => {
        this.setState({
            rating: parseInt(e.target.value)
        } as IState)
    }
    render() {
        return (
            <div>
                {this.state.lessonToRender ? <><h1>{this.state.lessonToRender.lesson_name}</h1>
                    <p>Location: {this.state.lessonToRender.lesson_location}</p>
                    <p>Price per Session: {this.state.lessonToRender.lesson_price} EUR</p>
                    <p>Duration: {this.state.lessonToRender.lesson_duration} min</p>
                    <p>Needed Equipment: {this.state.lessonToRender.lesson_equip}</p>
                    <p>Teaching Language: {this.state.lessonToRender.lesson_language}</p>
                    <p>Number of participants: {this.state.lessonToRender.lesson_amountPeople}</p>
                    <p>About me: {this.state.lessonToRender.lesson_abaoutTeacher}</p>
                    <p>Send email to: {this.state.lessonToRender.lesson_eMailTeacher}</p>

                    {
                        this.state.id && !this.state.lessonToRender.lesson_peopleRating.includes(this.state.id) &&
                        (<form onSubmit={(event) => this.giveFeedback(event)}>
                            <input id="rating" type="number" min="0" max="10" name="rating" onChange={this.changeHandlerInt} value={this.state.rating} />
                            <button className="btn btn-primary" id="submitrating"></button>
                        </form>)
                    }
                    <form onSubmit={(e) => this.emailHandler(e)}>
                        <div className="col-md-4 bg-info ">
                            <div className="form-group col-xs-4">
                                <input style={{ width: 'auto' }} type="text" name="subject" value={this.state.subject} onChange={this.changeHandler} />
                            </div>
                            <div className="form-group col-xs-4">
                                <textarea style={{ width: 'auto' }} name="message" value={this.state.message} onChange={this.changeHandler} />
                            </div>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-primary" type="submit">Send</button>
                            </div>
                        </div>
                    </form>
                    <div className=" col-md-4 col-xs-4" >
                        <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
                    </div>
                </>
                    :
                    <div className="row d-flex justify-content-start" style={{ marginTop: '50px' }} >
                        <div className="col-md-2"></div>
                        <div className="col-md-6 ">
                            <div className="jumbotron bg-info">
                                <div className="container ">
                                    <h1 className="display-4">Sorry!</h1>
                                    <p className="lead">Please return to search and try again.</p>
                                </div></div>
                        </div>
                    </div>}


                <div className=" col-md-4" >
                    <button style={{ marginBottom: '5%' }} className="btn btn-primary" onClick={this.handleQuery}>Back</button>
                </div>


            </div>
            
            
        )
    }

    giveFeedback(event: any) {
        event.preventDefault();
        const user = window.CS.getBMState().user as any
        if (!this.state.lessonToRender.lesson_peopleRating.includes(user._id)) {
            this.state.lessonToRender.lesson_peopleRating.push(user._id)
            this.state.lessonToRender.lesson_overallAmountOfRating += this.state.rating;
            const aiAction: IAction = {
                type: ActionType.server_called
            }
            window.CS.clientAction(aiAction);
            console.log(this.state.lessonToRender)
            axios.put('/lessons/rate/' + this.state.lessonToRender._id, this.state.lessonToRender)
                .then(res => {
                    console.log(res.data)
                    const uiAction: IUserAction = {
                        type: ActionType.user_updated,
                        user: res.data
                    }
                    window.CS.clientAction(uiAction);
                });
        }

    }
}