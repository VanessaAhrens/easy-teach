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
/*
  handleChangeHandler = (e: any) => {
    const action: ISearchAction = {
      type: ActionType.update_search,
      search: e.target.value
    }
    
    history.push('/LessonDetail/read/'+e.target.id);
    window.CS.clientAction(action)
  }   onClick={this.handleChangeHandler}*/
  render() {
    return (
      <table>
        <tbody>
          <tr><th>Description</th><th>Location</th><th></th></tr>
          {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) =>
            <tr key = {item._id}>
              <td>{item.lesson_name}</td>
              <td> {item.lesson_location}</td>
              <td>
                <button id={item._id}><Link to={'/LessonDetail/read/'+item._id}>Show</Link></button>
              </td>
            </tr>) : null}
        </tbody>
      </table>

    );

  }
}
export default SearchResult;