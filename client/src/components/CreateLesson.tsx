import React, { ChangeEvent } from 'react'
import { ILessonAction } from './ShowLesson';
import { ActionType, IAction } from '../framework/IAction';
import { ILessonData, IState } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import './CreateLesson.css';
import mongoose from 'mongoose';
import { Button } from 'react-bootstrap';
declare let window: IWindow;

interface IJSXState {
    lesson: {
        [key: string]: string | number | Object;
        lesson_name: any;
        lesson_duration?: any;
        lesson_location?: any;
        lesson_price?: any;
        lesson_equip?: any;
        lesson_language?: any;
        lesson_amountPeople?: any;
        lesson_eMailTeacher?: any;
        lesson_aboutTeacher?: any;
        lesson_pictureURL?: any;
        lesson_rating?: any;
        lesson_overallAmountOfRating?: any;
        lesson_peopleRating?: any;
    }
}

reducerFunctions[ActionType.lesson_updated] = function (newState: IState, updateAction: ILessonAction) {
    newState.UI.waitingForResponse = false;
}
reducerFunctions[ActionType.create_lesson] = function (newState: IState, updateAction: ILessonAction) {
    let newLesson: any = {
        lesson_name: updateAction.lesson.lesson_name,
        lesson_duration: updateAction.lesson.lesson_duration,
        lesson_location: updateAction.lesson.lesson_location,
        lesson_price: updateAction.lesson.lesson_price,
        lesson_equip: updateAction.lesson.lesson_equip,
        lesson_language: updateAction.lesson.lesson_language,
        lesson_amountPeople: updateAction.lesson.lesson_amountPeople,
        lesson_eMailTeacher: updateAction.lesson.lesson_eMailTeacher,
        lesson_aboutTeacher: updateAction.lesson.lesson_aboutTeacher,
        lesson_pictureURL: updateAction.lesson.lesson_pictureURL,
        lesson_rating: updateAction.lesson.lesson_rating
    };
    return newLesson;
}


export default class CreateLesson extends React.Component<{}, IJSXState> {
    state: IJSXState = {
        lesson: {
            lesson_name: '',
            lesson_duration: 0,
            lesson_location: '',
            lesson_price: 0,
            lesson_equip: '',
            lesson_language: '',
            lesson_amountPeople: '',
            lesson_eMailTeacher: '',
            lesson_aboutTeacher: '',
            lesson_pictureURL: '',
            lesson_overallAmountOfRating: 0,
            lesson_peopleRating: [],
            lesson_rating: 0

        }
    }
    render() {

        { console.log(this.state.lesson) }
        return (


            <form>
                <div className="form-row" style={{ marginTop: '50px' }}>
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-4">
                        <label htmlFor="lessonName">Lesson Name</label>
                        <input className="form-control" id="createName" type="text" name="lesson_name" value={this.state.lesson.lesson_name} onChange={this.handleChange} />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="duration">Duration</label>
                        <input className="form-control" id="createDuration" type="text" name="lesson_duration" value={this.state.lesson.lesson_duration} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="location">Location</label>
                        <input className="form-control" id="createLocation" type="text" name="lesson_location" value={this.state.lesson.lesson_location} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="neededEquip">Needed Equipment</label>
                        <input className="form-control" id="createEquip" type="text" name="lesson_equip" value={this.state.lesson.lesson_equip} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-2"></div>

                    <div className="form-group col-md-4">
                        <label htmlFor="language">Teaching Language</label>
                        <input className="form-control" id="createLanguage" type="text" name="lesson_language" value={this.state.lesson.lesson_language} onChange={this.handleChange} />
                    </div>

                    <div className="form-group col-md-2">

                        <label htmlFor="people">Number of participants</label>
                        <input className="form-control" id="createAmount" type="text" name="lesson_amountPeople" value={this.state.lesson.lesson_amountPeople} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="price">Price per Session</label>
                        <input className="form-control" id="createPrice" type="text" name="lesson_price" value={this.state.lesson.lesson_price} onChange={this.handleChange} />
                    </div>
                </div>


                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="about">About me</label>
                        <input className="form-control" id="createaboutTeacher" type="text" name="lesson_aboutTeacher" value={this.state.lesson.lesson_aboutTeacher} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="about">Picture</label>
                        <input className="form-control" id="createaboutTeacher" type="text" name="lesson_pictureURL" value={this.state.lesson.lesson_pictureURL} onChange={this.handleChange} />
                    </div>
                </div>

                {/*<div className="form-row">
                    <div className="col-md-2"></div>
                    <div className="form-group col-md-8">
                        <label htmlFor="about">Rating</label>
                        <input className="form-control" id="createaboutTeacher" type="text" name="lesson_rating" value={this.state.lesson.lesson_rating} onChange={this.handleChange} />
                    </div>
                </div>*/}

                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-5"></div>
                    <Button type="submit" className="btn btn-primary" onClick={this.handleSave} >Save Lesson</Button>
                </div>
                <div id="successful" style={{ color: 'lightgreen', textAlign: 'center', margin: '30px' }}></div>
            </form>
        )

    }

    handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement
        const name = target.name as string;
        let newLesson = this.state.lesson;
        newLesson[name] = target.value;
        this.setState({
            lesson: newLesson
        });
    }

    /*this function handles the save and will be later used for the save-button.
    
    
    
    */

    handleSave = (event: any) => {
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        const newLesson: ILessonData = {
            _id: mongoose.Types.ObjectId().toString(),    //retrieves the ID from Mongoose
            ...this.state.lesson                          // and the rest of the state
        }
        const action: ILessonAction = {
            type: ActionType.create_lesson,
            lesson: newLesson
        }

        axios.post('/lessons/add', newLesson)

            .then(res => {
                window.CS.clientAction(action);
                console.log(res.data._id, res.data)
            });
        let success = document.getElementById("successful")!
        success.innerText = "The creation of the lesson was successful and your students can now reach you. Happy teaching!";
        event.preventDefault();



    }
}
