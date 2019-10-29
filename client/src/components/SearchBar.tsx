import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IState } from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
import SimpleLesson from './SimpleLesson';
import history from '../framework/history';
import { Link } from 'react-router-dom';

declare const window: IWindow;
export interface ISearchAction extends IAction {
  search: string;
}

export interface ISearchResultAction extends IAction {
  data: Object;
}

reducerFunctions[ActionType.update_search] = function (newState: IState, action: ISearchAction) {
  newState.BM.searchQuery = action.search;
  return newState;
}

reducerFunctions[ActionType.update_search_results] = function (newState: IState, action: ISearchResultAction) {
  newState.BM.searchResult = action.data;
  return newState;
}

class SearchBar extends Component<{}, IState> {
  handleQuery = async () => {
    await axios.get('/lessons/search?query=' + window.CS.getBMState().searchQuery).then(response => {
      console.log(response)
      const action: ISearchResultAction = {
        type: ActionType.update_search_results,
        data: response.data
      }
      history.push('/searchresult');
      window.CS.clientAction(action);
    });
  }
  handleChangeHandler = (e: any) => {
    const action: ISearchAction = {
      type: ActionType.update_search,
      search: e.target.value
    }
    window.CS.clientAction(action)
  }
  render() {
    return (
      <>
      <div className="row" style={{ marginTop: '10%' }}>
        <div className="col-md-4"></div>
        <div className="col-md-4 ">
          <input className="form-control" type="text" name="query" value={window.CS.getBMState().searchQuery} onChange={e => this.handleChangeHandler(e)} placeholder="Search For Lesson" />
        </div>
        <div className=" col-md-4 col-xs-4" >
          <button className="btn btn-primary" onClick={this.handleQuery}>
            Search
       </button>
        </div>
      </div>
      
<div className="container marketing" style={{ marginTop: '5%' }}>
  <div className="row">
    <div className="col-lg-4">
      <img className="rounded-circle" src={'.././German.jpg'}  alt="teacher-pic" width='130' height='130' />
      <h3>Stefan Arndt</h3>
      <p>"German as foreign language adjusted to your level!"</p>
      <p><Link className = "btn btn-primary" to = "/login" role="button" >View details</Link></p>
    </div>
    <div className="col-lg-4">
      <img className="rounded-circle" src={'.././Math.JPG'}  alt="teacher-pic" width='130' height='130' />
      <h3>Peter Hendricks</h3>
      <p>"Mathematics for your base studies - until you pass your tests."</p>
      <p><Link className = "btn btn-primary" to = "/login" role="button" >View details</Link></p>
    </div>
    <div className="col-lg-4">
      <img className="rounded-circle" src={'.././Music.jpg'}  alt="teacher-pic" width='130' height='130' />
      <h3>Claudia Moy</h3>
      <p>"Music Lessons for students and children from a professional Oboist."</p>
      <p><Link className = "btn btn-primary" to = "/login" role="button" >View details</Link></p>
      
    </div>
  </div>
  
  
</div>
</>
    );
  }
}
export default SearchBar;