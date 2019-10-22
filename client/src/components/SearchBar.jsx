import React, { Component } from 'react';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';


class SearchBar extends Component {
  state = {
    searchQuery: ''
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
            value={this.props.value}
            onChange={e => this.setState({searchQuerye: e.target.value})}
            placeholder="Search For Lesson" />
        </div>
        
        <div className="control">
          <a className="button is-info" onClick={()=>this.props.onSearch(this.state.searchQuery)}>
            Search
        </a>
        </div>
      </div>
    );
  }
}

export default SearchBar; 