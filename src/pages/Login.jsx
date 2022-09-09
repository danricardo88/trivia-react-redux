import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerReducer } from '../redux/actions';
import fetchToken from '../services/triviaToken';

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
        <form className="form login" onSubmit={ this.submitButton }>
          <h2>Trivia</h2>
          <label htmlFor="email">
            Name:
            <input
              className="input"
              name="name"
              data-testid="input-player-name"
              type="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Email
            <input
              className="input"
              minLength="6"
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
            Entrar
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
