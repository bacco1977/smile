import React from 'react';
import styles from './SmileLanding.module.css';
import axios from 'axios';
import Profile from '../Profile';

export default class SmileLanding extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      values: [],
      sortedValues: [],
      selectedPatient: null
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/list',{
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    })
    .then(res => {
        this.setState({
          values: res.data,
          sortedValues: res.data
        })
    });
  }

  onFormChange = (event) =>{
    if(!event.target.value){
      this.setState({
        sortedValues: this.state.values
      });
    } else {
      let values = this.state.sortedValues;
      values = values.filter(value => (value.name.toUpperCase().includes(event.target.value.toUpperCase())) || (value.patientId.toUpperCase().includes(event.target.value.toUpperCase())));
  
      this.setState({
        sortedValues: values
      });
    }
  }

  selectPatient = (patient) =>{
    this.setState({
      selectedPatient: patient
    })
  }


  render() {
    return ( 
      <div className="container">
        <h2 className={styles.pageTitle}>{this.state.selectedPatient ? "Profile" : "Patient Search"}</h2>
        {this.state.sortedValues && !this.state.selectedPatient &&
        <div>
            <div className="row justify-content-center m-3">
              <input className="form-control" placeholder="Search by Name or patientId number" type="text" name ="patientId" onChange={this.onFormChange}/>
            </div>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Patient ID</th>
                  <th scope="col">Guardian</th>
                  <th scope="col">Latest Similarity Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sortedValues.map((value, index) => (
                  <tr>
                    <th className="btn-link" onClick={() => this.selectPatient(value)}>{value.name}</th>
                    <td>{value.email}</td>
                    <td>{value.dob}</td>
                    <td>{value.register_date}</td>
                    <td>{value.gender}</td>
                    <td>{value.patientId}</td>
                    <td>{value.guardian}</td>
                    <td>{value.latest_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {this.state.selectedPatient &&
        <Profile patient={this.state.selectedPatient}/>
        }
      </div>
    );
  }
}