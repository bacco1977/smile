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
      values = values.filter(value => (value.name.toUpperCase().includes(event.target.value.toUpperCase())) || (value.pps.toUpperCase().includes(event.target.value.toUpperCase())));
  
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
              <input className="form-control" placeholder="Search by Name or PPS number" type="text" name ="pps" onChange={this.onFormChange}/>
            </div>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Registration</th>
                  <th scope="col">Sex</th>
                  <th scope="col">PPS</th>
                  <th scope="col">Guardian</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sortedValues.map((value, index) => (
                  <tr>
                    <th className="btn btn-link" onClick={() => this.selectPatient(value)}>{value.name}</th>
                    <td>{value.dob}</td>
                    <td>{value.register_date}</td>
                    <td>{value.sex}</td>
                    <td>{value.pps}</td>
                    <td>{value.parent}</td>
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