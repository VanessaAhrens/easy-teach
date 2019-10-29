import React, { Component } from 'react';
import { IWindow } from '../framework/IWindow';

import { ActionType, IAction } from '../framework/IAction';
import { IState } from '../state/appState'
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

export default class LessonDetail extends React.Component<IProps>  {
    constructor(props: any) {
        super(props);
    }
    handleQuery = () => {
        history.push('/searchresult');
    }
    render() {
        const lessonToRender = window.CS.getBMState().searchResult.filter((item: any) => this.props.match.params.id === item._id);
        return (
            <div>
                {lessonToRender.length != 0 ? <><h1>{lessonToRender[0].lesson_name}</h1>
                    <p>Location: {lessonToRender[0].lesson_location}</p>
                    <p>Price per Session: {lessonToRender[0].lesson_price} EUR</p>
                    <p>Duration: {lessonToRender[0].lesson_duration} min</p>
                    <p>Needed Equipment: {lessonToRender[0].lesson_equip}</p>
                    <p>Teaching Language: {lessonToRender[0].lesson_language}</p>
                    <p>Number of participants: {lessonToRender[0].lesson_amountPeople}</p>
                    <p>About me: {lessonToRender[0].lesson_abaoutTeacher}</p>
                    <h5><a href="mailto:yxcyxc@yxcc.de">Please click me</a>Please contact: {lessonToRender[0].lesson_eMailTeacher}</h5>
                    <div className=" col-md-4 col-xs-4" >
                        <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
                    </div>
                </>
                    : <h1>Please return to search and try again</h1>}

            </div>
        )
    }
}