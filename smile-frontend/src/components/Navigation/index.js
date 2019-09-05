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
          <a className="navbar-brand" href="/#/"> 
            <img src="http://www.craniofacial.ie/wp-content/themes/Craniofacial/img/HEADER_LOGO_landscape.png" alt="Smile Landing Page" />
          </a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <button className="btn btn-link" onClick={this.navigateToUpload}>Image Upload</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link" onClick={this.navigateToSearch}>Search</button>
            </li>
          </ul>
    </nav>
    );
  }
}
