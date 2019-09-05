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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Smile Landing Page</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <button className="btn btn-link" onClick={this.navigateToUpload}>Image Upload</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link" onClick={this.navigateToSearch}>Search</button>
              </li>
            </ul>
          </div>
      </nav>
    );
  }
}
