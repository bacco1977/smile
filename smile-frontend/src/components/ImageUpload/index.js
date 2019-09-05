import React from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css';

export default class ImageUpload extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            fileUploaded: null,
            imgPreview: './assets/img/placeholder.jpg',
        }
    }

    fileSelected = (event) =>{
        this.setState({
            fileUploaded: event.target.files[0],
            imgPreview: URL.createObjectURL(event.target.files[0])
        });
    }

    fileUploadHandler= () =>{
        const data = new FormData();
        data.append('image', this.state.fileUploaded, this.state.fileUploaded.name)
        axios.post('http://localhost:5000/api/success', data, {
            onUploadProgress: progressEvent =>{
                console.log((progressEvent.loaded/progressEvent.total) * 100 +"%");
            },
            headers: { 
                'x-apikey': '59a7ad19f5a9fa0808f11931',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        })
        .then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-between flex-column">
                <h2 className={styles.pageTitle}>Upload your image here</h2>
                {this.state.imgPreview && <img src={this.state.imgPreview} className={styles.imgPreview} alt="Preview"/>}
                <div className="row justify-content-center">
                    <input type="file" onChange={this.fileSelected}/>
                </div>
                <div className="row justify-content-center">
                    <button className={styles.uploadButton} onClick={this.fileUploadHandler}>Upload</button>
                </div>
            </div>
        );
  }
}
