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
        axios.post('http://localhost:5000/upload/', data, {
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
