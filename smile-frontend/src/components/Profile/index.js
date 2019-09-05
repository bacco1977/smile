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
            <h2>{"PPS: " + this.props.patient.pps}</h2>
            <h2>{"Date of Birth: " + this.props.patient.dob}</h2>
        </div>
        <div className ="col-6">
            <img src={this.state.imgPreview} alt="Preview" style={{width:"80%", height: "auto"}}/>
        </div>
      </div>
    );
  }
}