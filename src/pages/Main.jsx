import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import GameQuestions from '../components/GameQuestions';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      buttonIsVisible: false,
      counter: 0,
      isLoading: true,
      questions: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await questions.json();
    if (questionsJson.response_code !== 0) {
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        questions: questionsJson.results,
        isLoading: false,
      });
    }
  }

  handleClick = () => {
    const { counter } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true }, () => {
      const MAXIMUM_NUMBER_OF_QUESTIONS = 4;

      if (counter === MAXIMUM_NUMBER_OF_QUESTIONS) {
        history.push('/feedback');
      }
      this.setState({ isLoading: false, counter: counter + 1 });
    });
  };

  changeButtonIsVisible = () => {
    this.setState((prevState) => ({
      buttonIsVisible: !prevState.buttonIsVisible,
    }));
  };

  render() {
    const { questions, isLoading, counter, buttonIsVisible } = this.state;

    const question = questions[counter];

    return (
      <main>
        {isLoading
          ? <Loading /> : (
            <div>
              <Header />
              <GameQuestions
                changeButtonIsVisible={ this.changeButtonIsVisible }
                question={ question }
              />
              {
                buttonIsVisible && (
                  <button
                    data-testid="btn-next"
                    type="button"
                    onClick={ () => {
                      this.handleClick();
                      this.changeButtonIsVisible();
                    } }
                  >
                    Next
                  </button>

                )
              }
            </div>
          )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

Main.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(mapStateToProps)(Main);
