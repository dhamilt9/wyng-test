import React, { Component } from "react";
import PropTypes from "prop-types";

class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        files:{},
        uploaded:false,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    // this.fileInput = React.createRef();
  }
  
  //When a file is uploaded to an input, sets the state of the current uploaded files to include the selected file
  onChange(number, e) {
    var files=this.state.files;
    files[number]=e.target.files[0];
    this.setState({files:files});
    console.log(this.state.files);
  }
  
  //Posts to endpoint "imageupload" with all files included in the form. On success, set the uploaded state to true.
  onSubmit(e) {
    e.preventDefault();
    const endpoint='/imageupload';
    const formData = new FormData();
    Object.keys(this.state.files).map(i=>formData.append('file', this.state.files[i]))
    
    const config = {
        method: 'post',
        body: formData
    }
    
    fetch(
      endpoint,
      config
    ).then(
      response => {
        console.log(response);
        if (response.status==201){
          this.setState({uploaded:true})
        }else{
          alert("Something went wrong with the upload")
        }
      }
    )
  }
  
  //Generates the five file inputs
  createInputs=()=>{
      let inputs=[];
      
      for (let i=0; i<5; i++){
          inputs.push(<input className="fileInput" name="image{i}" key={i} type="file" onChange={(e)=>this.onChange(i, e)}/>);
      }
      return inputs;
  }
  
  //Generates the top text based on whether or not the images are submitted
  createHeadline=()=>{
      if (this.state.uploaded==true){
        return(<p>Your files have been uploaded. If you upload another set if files, they will be replaced.</p>)
      }else{
        return(<p>Please upload your files (if there are already files uploaded, they will be replaced)</p>)
      }
  }

  render() {
    return (
    <div>
      {this.createHeadline()}
      <form encType="multipart/form-data" onSubmit={(e)=>(this.onSubmit(e))}>
        {this.createInputs()}
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}

export default ImageUploadForm