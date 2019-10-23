import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IState } from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
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
   await axios.get('/lessons/search?query='+window.CS.getBMState().searchQuery).then(response => {
     const action: ISearchResultAction = {
       type: ActionType.update_search_results,
       data: response.data
     }
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
     <div className="field has-addons"
       style={{
         padding: "20px",
         margin: "20px"
       }}
     >
       <div className="control">
         <input
           className="input"
           type="text"
           name="query"
           value={window.CS.getBMState().searchQuery}
           onChange={e => this.handleChangeHandler(e)}
           placeholder="Search For Lesson" />
       </div>
       <div className="control">
         <a className="button is-info" onClick={this.handleQuery}>
           Search
       </a>
       </div>
     </div>
   );
 }
}
export default SearchBar;