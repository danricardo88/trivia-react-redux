import React, { Component } from 'react';
import Header from '../components/Header';

export default class Main extends Component {
  render() {
    console.log(localStorage.getItem('token'));
    return (
      <div>
        <Header />
        Main
      </div>
    );
  }
}
