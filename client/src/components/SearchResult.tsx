import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IState } from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
import SimpleLesson from './SimpleLesson';
import SearchBar from './SearchBar';
import history from '../framework/history';
import { Link } from 'react-router-dom';

declare const window: IWindow;
export interface ISearchAction extends IAction {
  search: string;
}

export interface ISearchResultAction extends IAction {
  data: Object;
}

class SearchResult extends Component<{}, IState> {
  handleQuery = () => {
    history.push('/');
  }

  render() {
    if (window.CS.getBMState().searchResult.length == 0) {
      return (
        <div>
          <div className="row d-flex justify-content-start" style={{ marginTop: '50px' }} >
            <div className="col-md-2"></div>
            <div className="col-md-6 ">
              <div className="jumbotron bg-info">
                <div className="container ">
                  <h1 className="display-4">Sorry!</h1>
                  <p className="lead">We have currently no Teacher for your search...</p>
                </div></div>
            </div>
          </div>
          <div className="row">
            <div className=" col-md-4 col-xs-4" > </div>
            <div className="col-md-4 d-flex justify-content-center" style={{ marginTop: '2%' }}>
              <button className="btn btn-primary" onClick={this.handleQuery} >Back to Home</button>
            </div>
          </div></div>
      )
    } else {
      return (
        <div>
          <h5 className="d-flex justify-content-center" style={{ marginTop: '2%' }} >We found following results for your search:</h5>

          {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) =>

            <>
              <div className="row" style={{ marginTop: '2%' }} ></div>




              <div className="row " style={{ marginTop: '2%', marginBottom: '2%' }} key={item._id} >
                <div className="col-md-1"></div>
                <div className="col-md-2" > <img className="rounded-circle" src={item.lesson_pictureURL} alt="No picture added" width='130' height='130' /> </div>

                <div className="col-md-6 bg-primary d-flex align-items-center" >
                  <div className=" col-md-4 bg-light " >
                    <span>{item.lesson_name}</span>    </div>
                  <div className=" bg-light flex-fill ">
                    <span>{item.lesson_location}</span> </div>
                  <div className=" col-md-2 bg-light  ">
                    <span>{item.lesson_price}€</span> </div>
                  <div className=" col-md-2 bg-light  ">
                    <div> Rating:{item.lesson_peopleRating.length != 0 ? (item.lesson_overallAmountOfRating / item.lesson_peopleRating.length).toFixed(2) : 'No ratings'}</div>
                  </div>
                </div>

                <div className="col-md-2 d-flex justify-content-center" style={{ marginTop: '2%' }}> <button className="btn btn-primary " id={item._id}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/LessonDetail/read/' + item._id}>Show</Link></button></div>
              </div></>) : null}

          <div className="row">
            <div className=" col-md-4 col-xs-4" > </div>
            <div className="col-md-4 d-flex justify-content-center" style={{ marginTop: '2%' }}>
              <button className="btn btn-primary" onClick={this.handleQuery} >Back</button>
            </div>
          </div>
        </div>

      );

    }
  }
}
export default SearchResult;