import React from 'react';
import style from './Navigation.module.css';

export default class Navigation extends React.Component {

  navigateToUpload = () => {
    window.location.assign('/#/upload');
  }

  navigateToSearch = () => {
    window.location.assign('/#/');
  }

  render() {
    return (
      <header className={style.topHeader}>
        <div className="row align-items-center">
          <a className="navbar-brand col" href="/#/"> 
            <img src="./assets/img/craniofacial-logo.png" alt="Smile Landing Page" />
          </a>
          <nav className="col">
            <ul className="nav">
              <li className="nav-item">
                  <button className="btn btn-link" onClick={this.navigateToUpload}>Image Upload</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link" onClick={this.navigateToSearch}>Search</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
