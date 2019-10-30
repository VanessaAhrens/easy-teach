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
      <table>
        <tbody>
          <tr><th>Description</th><th>Location</th><th></th></tr>
          {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) =>
          
            <tr key = {item._id}>
              
            <td><img src={item.lesson_pictureURL}></img></td>
              <td>{item.lesson_name}</td>
              <td> {item.lesson_location}</td>
              <td>
                <button id={item._id}><Link to={'/LessonDetail/read/' + item._id}>Show</Link></button>
              </td>
              <td> {item.lesson_peopleRating.length != 0 ? (item.lesson_overallAmountOfRating / item.lesson_peopleRating.length).toFixed(2) : 'No ratings' }</td>
            </tr>) : null}
          <tr>
            <td >
              <div className=" col-md-4 col-xs-4" >
                <button className="btn btn-primary" onClick={this.handleQuery}>Back</button>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

    );

  }
}
export default SearchResult;