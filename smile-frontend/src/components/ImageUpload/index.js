import React from 'react';
import axios from 'axios';

export default class ImageUpload extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            fileUploaded: null,
        }
    }

    fileSelected = (event) =>{
        this.setState({
            fileUploaded: event.target.files[0],
        });
    }

    fileUploadHandler= () =>{
        const data = new FormData;
        data.append('image', this.state.fileUploaded, this.state.fileUploaded.name)
        axios.post('http://localhost:5000/', data, {
            onUploadProgress: progressEvent =>{
                console.log((progressEvent.loaded/progressEvent.total) * 100 +"%");
            }
        })
        .then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-between flex-column">
                <h1 className="mb-4">Upload your image here</h1>
                <input type="file" onChange={this.fileSelected}/>
                <button className="btn btn-secondary mt-3 w-25" onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
  }
}
