//Loads the app into the DOM

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
	render(){
		return(
			<div id="mainApp">
        <BrowserRouter>
          <MainPage/>
        </BrowserRouter>
			</div>
		)
	}
}
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;