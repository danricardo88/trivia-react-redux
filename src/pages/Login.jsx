import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerReducer } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    buttonDisabled: true,
    password: '',
  };

  isValidEmail = () => {
    const { email, password } = this.state;
    if (email && password) {
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
    dispatch(playerReducer(this.state));
    history.push('/carteira');
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
            Email:
            <input
              className="input"
              name="email"
              data-testid="input-player-name"
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              className="input"
              minLength="6"
              name="password"
              type="password"
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
