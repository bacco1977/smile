import React from 'react';

export default class Navigation extends React.Component {

  navigateToUpload = () => {
    window.location.assign('/#/upload');
  }

  navigateToSearch = () => {
    window.location.assign('/#/');
  }

  render() {
    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-link mr-5" onClick={this.navigateToUpload}>Image Upload</button>
            <button className="btn btn-link" onClick={this.navigateToSearch}>Search</button> 
        </div>
    );
  }
}
