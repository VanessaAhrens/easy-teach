import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IState } from '../state/appState'
import { ILessonData } from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
import SimpleLesson from './SimpleLesson';
import SearchBar from './SearchBar';
import ShowLesson from './ShowLesson';
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
    lesson = {
        lesson_name: ''
    }
    componentDidMount() {
        //const selectedLesson = window.CS.getBMState().lessons.filter(lesson => lesson._id === this.props.match.params.id)[0];
        axios.get('/lessons/read/'+this.props.match.params.id).then(
            response => {
               
                this.lesson = response.data}
        )
    }
    render() {
        console.log("id",window.CS.getBMState().lessons[0])
        console.log(window.CS.getBMState().lessons);
        return (
            <div>
                <p>hello</p>
                <p>{this.lesson.lesson_name}</p>

            </div>
        )
    }
}