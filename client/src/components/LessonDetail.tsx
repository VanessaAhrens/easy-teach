import React, { Component } from 'react';
import { IWindow } from '../framework/IWindow';
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
    render() {
        const lessonToRender = window.CS.getBMState().searchResult.filter((item: any) => this.props.match.params.id === item._id);
        return (   
            <div>
                <p>hello</p>
                {lessonToRender.length != 0 ? <><h1>{lessonToRender[0].lesson_name}</h1>
                <p>{lessonToRender[0].lesson_location}</p></> : <h1>Please return to search and try again</h1>}
            </div>
        )
    }
}