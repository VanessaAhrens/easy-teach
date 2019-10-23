import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IState } from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
import SimpleLesson from './SimpleLesson';

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
         <a className="btn btn-primary" onClick={this.handleQuery}>
           Search
       </a>
       <table>
            <tbody>
              <tr><th>description</th><th>duration</th><th>location</th><th>price</th><th>equip</th><th>language</th><th>amount of People</th><th>Email</th><th>about the Teacher</th></tr>
              {window.CS.getBMState().searchResult ? window.CS.getBMState().searchResult.map((item: any) => <SimpleLesson key={item._id} lesson={item} edit={false} />) : null}
            </tbody>
          </table>


       </div>
     </div>
   );
 }
}
export default SearchBar;