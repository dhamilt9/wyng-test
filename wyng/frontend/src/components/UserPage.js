import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageList from "./ImageList"
import Cookies from 'universal-cookie';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state={
        //checks cookies to see if user voted, otherwise default to false
        voted:cookies.get('voted') || false,
        imagelist:[]
    }
		this.onVote=this.onVote.bind(this)
  }
  
	componentDidMount(){
		this.fetchImages();
	}
  
  //Gets a list of the current images
	fetchImages(){
		fetch('/image')
		.then(response => {
      if (response.status !== 200) {
        return this.onFailure("Couldn't fetch images");
      }
      return response.json();
    })
		.then(
			data => {
				this.setState({
					imagelist: data
				})
			}
		);
	}

	
  //OnClick for a vote button, calls a POST to endpoint 'vote' with the image PK in the body, if successful, change the voted state to true and reload images in case order changed, sets voted cookie to true
  onVote(e) {
    const imageID=e.target.getAttribute('image_id');
    const endpoint='/vote';
    const config = {
        method: 'post',
        body: {"id": imageID}
    }
    fetch(
      endpoint+"/"+imageID,
      config
    ).then(
      response => {
        if (response.status==200){
          this.setState({voted:true});
          this.fetchImages();
          const cookies = new Cookies();
          cookies.set('voted', true, { path: '/' });
        }else{
          alert("Something went wrong with voting");
        }
      }
    )
  }
  
  //Desplays a message based on whether or not the user voted and/or there are images uploaded
  createHeadline=()=>{
      if (this.state.voted && this.state.imagelist.length>0){
        return(<p>Thank you for voting!</p>)
      }else if (this.state.imagelist.length>0){
        return(<p>Here are the images you can vote on!</p>)
      }else{
        return(<p>There are no images to vote on at this time</p>)
      }
  }
  
  render() {
    return (
        <div>
          {this.createHeadline()}
          <ImageList onVote={this.onVote} voted={this.state.voted} imagelist={this.state.imagelist} />
        </div>
    );
  }
}

export default UserPage