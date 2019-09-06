import React from 'react';

export default class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state ={
        imgPreview: './assets/img/placeholder.jpg',
    }
  }

  componentDidMount(){
      //load in data
  }

  render() {
    return ( 
      <div className="container row">
        <div className ="col-6">
            <h2>{"Name: " + this.props.patient.name}</h2>
            <h2>{"Patient Id: " + this.props.patient.patientId}</h2>
            <h2>{"Date of Birth: " + this.props.patient.dob}</h2>
        </div>
      </div>
    );
  }
}