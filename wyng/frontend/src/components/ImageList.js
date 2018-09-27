//Lists images in order of votes, and allows user to vote if they have not already

import React, {Component} from 'react';
import PropTypes from 'prop-types';
  

class ImageList extends Component {

	constructor(props){
		super(props);
    this.handleClick = this.handleClick.bind(this)
	}
  
  handleClick(e){
    this.props.onVote(e)
  }
  
  //onClick function passed in via props
  renderVoteButton(imgid, f, voted){
    if(!voted){
      return(
        <button type="button" image_id={imgid} onClick={f}>Vote</button>
      )
    }
  }
  
	render() {
    const imageNodes=this.props.imagelist.map((img, index) =>
      <div key={index}>
        <p>Position: {index+1}</p>
        <p>Votes: {img.votes}</p>
        <img width="100px" src={"../media/" + img.file.split("/").pop()} />
        {this.renderVoteButton(img.id, this.handleClick, this.props.voted)}
        <p>*********</p>
      </div>
    );
		return (
			<div>
        <ul>{imageNodes}</ul>
			</div>
		);
	}
}

export default ImageList;