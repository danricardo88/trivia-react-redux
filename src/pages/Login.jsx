import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerReducer } from '../redux/actions';
import fetchToken from '../services/triviaToken';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    email: '',
    buttonDisabled: true,
    name: '',
  };

  isValidEmail = () => {
    const { email, name } = this.state;
    if (email && name) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.isValidEmail);
  };

  submitButton = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const request = await fetchToken();
    const { token } = request;
    localStorage.setItem('token', token);
    dispatch(playerReducer(this.state));
    history.push('/main');
  };

  render() {
    const {
      buttonDisabled,
    } = this.state;

    return (
      <div className="center">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="form login" onSubmit={ this.submitButton }>
          <h2>Trivia</h2>
          <label htmlFor="input-player-name">
            Name:
            <input
              id="input-player-name"
              className="input"
              name="name"
              data-testid="input-player-name"
              type="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              id="input-gravatar-email"
              className="input"
              // minLength="6"
              name="email"
              type="text"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            className="input btn"
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
          >
            Play
          </button>
          <button
            className="input btn"
            data-testid="btn-settings"
            type="button"
            onClick={ () => {
              const { history } = this.props;
              history.push('/settings');
            } }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
