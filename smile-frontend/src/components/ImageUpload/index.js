import React from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css';
import SymmetryScore from '../SymmetryScore';

export default class ImageUpload extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            fileUploaded: null,
            imgPreview: './assets/img/placeholder.jpg',
            username: null, 
            email: null,
            patientId: null, 
            guardian: null, 
            dob: null,
            registration: null,
            gender: null,
            score: null
        }
    }

    clearForm = () =>{
        this.setState({
            fileUploaded: null,
            imgPreview: './assets/img/placeholder.jpg',
            username: null, 
            email: null,
            patientId: null, 
            guardian: null, 
            dob: null,
            registration: null,
            gender: null,
            score: null
        })
    }

    onFormChange = (event) =>{
        if(event.target.name === 'image'){
            this.setState({
                fileUploaded: event.target.files[0],
                imgPreview: URL.createObjectURL(event.target.files[0])
            });
        } else {
            this.setState({
                [event.target.name] : [event.target.value]
            });
        }
    }

    fileUploadHandler= () =>{
        const data = new FormData();
        data.append('image', this.state.fileUploaded, this.state.fileUploaded.name)
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('patientId', this.state.patientId)
        data.append('guardian', this.state.guardian)
        data.append('dob', this.state.dob)
        data.append('registration', this.state.registration)
        data.append('gender', this.state.gender)
        axios.post('http://localhost:5000/api/success', data, {
            onUploadProgress: progressEvent =>{
                console.log((progressEvent.loaded/progressEvent.total) * 100 +"%");
            },
            headers: { 
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        })
        .then(res => {
            console.log(res);
            this.setState({
                score : res.data
            });
        });
    }

    checkValid = () =>{
        if(
            !this.state.fileUploaded ||
            !this.state.username ||
            !this.state.email ||
            !this.state.guardian || 
            !this.state.dob ||
            !this.state.patientId ||
            !this.state.registration ||
            !this.state.gender
        ){
            return false;
        } else return true;
    }

    render() {
        return (
            <div className="d-flex justify-content-between flex-column">
                {!this.state.score &&
                <React.Fragment>
                    <h2 className={styles.pageTitle}>Upload your image here</h2>
                    <div className="row">
                        <div className="col-sm">
                            {this.state.imgPreview && <img src={this.state.imgPreview} className={styles.imgPreview} alt="Preview"/>}
                            <div className={styles.uploadWrapper}>
                                <button className={styles.uploadButton}>Upload image</button>
                                <input type="file" name ="image" onChange={this.onFormChange}/>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="row justify-content-center mt-3">
                                <input className="form-control"  placeholder="Ex: John Doe" type="text" name ="username" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter full name</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Ex: john@doe.com" type="email" name ="email" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter email</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Ex: Male/Female" type="text" name ="gender" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter gender</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Ex: Jane Doe" type="text" name ="guardian" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter guardian's name</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Ex: 123456ABC" type="text" name ="patientId" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter patient ID</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Please enter date of birth" name ="dob" type="date" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter date of birth</div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <input className="form-control" placeholder="Please enter registration date" name ="registration" type="date" onChange={this.onFormChange}/>
                                <div style={{ marginRight: 'auto', fontSize: '12px'}}>Please enter registration date</div>
                            </div>
                            <div className="row">
                                <button disabled={!this.checkValid()} className={styles.sendButton} onClick={this.fileUploadHandler}>Submit</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                }
                <div>
                {this.state.score &&
                    <React.Fragment>
                        <SymmetryScore name={this.state.username} score={this.state.score}/>
                        <button className="btn btn-secondary" onClick={() =>{this.clearForm()}}>BACK</button>
                    </React.Fragment>
                }
                </div>
            </div>
        );
  }
}
