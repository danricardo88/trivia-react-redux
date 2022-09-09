import React, { Component } from 'react';

export default class Main extends Component {
  render() {
    console.log(localStorage.getItem('token'));
    return (
      <div>Main</div>
    );
  }
}
