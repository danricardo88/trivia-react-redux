import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <header>
        <img
          width="50px"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(email)}` }
          alt="Profile pic"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  email: string,
  name: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
