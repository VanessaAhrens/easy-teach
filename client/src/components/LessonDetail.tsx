import React, { Component } from 'react';
import { IWindow } from '../framework/IWindow';
import { ILessonData, IState } from '../state/appState'
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import history from '../framework/history';
import { reducerFunctions } from '../reducer/appReducer';

export interface ISearchResultAction extends IAction {
    data: Object;
}

interface ILessonRated extends IAction {
    lessons: ILessonData[]
}

declare let window: IWindow;

interface IProps {
    location: any,
    history: any,
    match: any
}

interface ILocalState {
    lessonToRender: any,
    email: string;
    subject: string;
    message: string;
    rating: number;
    id: string;
}

reducerFunctions[ActionType.lesson_rated] = function (newState: IState, updateAction: ILessonRated) {
    newState.BM.lessons = updateAction.lessons;
    return newState;
}

export default class LessonDetail extends React.Component<IProps, ILocalState>  {
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
        } as ILocalState)
    }
    changeHandlerInt = (e: any) => {
        this.setState({
            rating: parseInt(e.target.value)
        } as ILocalState)
    }
    render() {
        return (
            <div>

                {this.state.lessonToRender ?

                    <>
                        <div className="row " style={{ marginTop: '5%' }}>
                            <div className="col-md-4"></div>
                            <div className="col-md-4 bg-info text-center ">
                                <h1>{this.state.lessonToRender.lesson_name}</h1>
                                <p>Location: {this.state.lessonToRender.lesson_location}</p>
                                <p>Price per Session: {this.state.lessonToRender.lesson_price} EUR</p>
                                <p>Duration: {this.state.lessonToRender.lesson_duration} min</p>
                                <p>Needed Equipment: {this.state.lessonToRender.lesson_equip}</p>
                                <p>Teaching Language: {this.state.lessonToRender.lesson_language}</p>
                                <p>Number of participants: {this.state.lessonToRender.lesson_amountPeople}</p>
                                <p>About me: {this.state.lessonToRender.lesson_abaoutTeacher}</p>
                                <p>Send email to: {this.state.lessonToRender.lesson_eMailTeacher}</p> 
                                

                            
                            <div className = "d-flex flex-row">
                                <form onSubmit={(e) => this.emailHandler(e)}>
                                <div className="col-md-4 bg-info form-group">
                                        <input className = "form-control" style={{ width: 'auto' }} type="text" name="subject" value={this.state.subject} onChange={this.changeHandler} />
                                       <textarea className = "form-control" style={{ width: 'auto' }} name="message" value={this.state.message} onChange={this.changeHandler} />
                                        <button className="btn btn-primary form-control" type="submit">Send</button>
                                    </div>


                            </form>
                            {
                                this.state.id && !this.state.lessonToRender.lesson_peopleRating.includes(this.state.id) &&
                                (<form onSubmit={(event) => this.giveFeedback(event)}>
                                   <div className="form-group"> <input width = "40px" id="rating" type="number" min="0" max="10" name="rating" onChange={this.changeHandlerInt} value={this.state.rating} />
                                    <button className="btn btn-primary" id="submitrating">Submit Rating</button>
                                    </div></form>)
                            }
                            </div>
                            </div>
                            <div className=" col-md-4 col-xs-4" >
                                <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
                            </div>
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



            </div>



        )
    }

    giveFeedback(event: any) {
        event.preventDefault();
        const user = window.CS.getBMState().user as any
        if (!this.state.lessonToRender.lesson_peopleRating.includes(user._id)) {
            this.state.lessonToRender.lesson_peopleRating.push(user._id)
            this.state.lessonToRender.lesson_overallAmountOfRating += Number(this.state.rating);
            const aiAction: IAction = {
                type: ActionType.server_called
            }
            window.CS.clientAction(aiAction);
            console.log(this.state.lessonToRender)
            axios.put('/lessons/rate/' + this.state.lessonToRender._id, this.state.lessonToRender)
                .then(res => {
                    console.log(res.data, window.CS.getBMState().lessons.map((lesson: any, index: any) => lesson._id === res.data._id ? res.data : lesson))
                    const uiAction: ILessonRated = {
                        type: ActionType.lesson_rated,
                        lessons: window.CS.getBMState().lessons.map((lesson: any, index: any) => lesson._id === res.data._id ? res.data : lesson)
                    }
                    window.CS.clientAction(uiAction);
                });
        }

    }
}