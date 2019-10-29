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
    return (
      <div>

        <h3>Results</h3>
        {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) =>

          <div className="row" key={item._id}>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <img src={item.lesson_pictureURL}/>

              <p>{item.lesson_name}</p>
              <p> {item.lesson_location}</p>
              <p>
                <button id={item._id}><Link to={'/LessonDetail/read/' + item._id}>Show</Link></button>
              </p>
            </div>
            <div className="col-md-4"></div>
          </div>) : null}


        <div className=" col-md-4 col-xs-4" >
          <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
        </div>



      </div>

    );

  }
}
export default SearchResult;