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
      <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Sorry!</h1>
        <p className="lead">Sorry! We have currently no Teacher for your search.</p>
      </div>
    </div>
    )
  } else {
    return (
      <div>


        {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) =>
          <>
            <div className="row" style={{ marginTop: '2%' }} ></div>
            <h5 className="d-flex justify-content-center" >We found following results for your search:</h5>


            <div className="row " style={{ marginTop: '2%', marginBottom: '2%' }} key={item._id} >

              <div className="col-md-2" ></div>
              <div className="col-md-8 bg-primary" >
                <img src={item.lesson_pictureURL} />

              <div className="d-flex justify-content-around bg-light"> <span>{item.lesson_name}</span>   <span>{item.lesson_location }</span>  <span>{item.lesson_price}€</span> </div>
                
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
}}
export default SearchResult;