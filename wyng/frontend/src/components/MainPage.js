//Renders the appropriate page based on the URL

import React, { Component } from 'react';
import PropTypes from "prop-types";
import ImageUploadForm from './ImageUploadForm';
import UserPage from './UserPage';
import { Switch, Route } from 'react-router-dom'


class MainPage extends Component{
	render(){
		return(
      <Switch>
        <Route path='/client' component={ImageUploadForm}/>
        <Route path='/user' component={UserPage}/>
        <Route exact path='/' component={UserPage}/>
      </Switch>
		)
	}
}

export default MainPage;