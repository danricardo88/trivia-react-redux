import React, { Component } from 'react';
import PropTypes from 'prop-types';

import aleatoryQuestions from '../services/aleatoryQuestions';

class GameQuestions extends Component {
  state = {
    allQuestions: [],
    category: '',
    correctAnswer: '',
    difficulty: '',
    incorrectAnswers: [],
    question: '',
  };

  componentDidMount() {
    const { question } = this.props;

    const { category, difficulty } = question;

    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const gameQuestion = question.question;

    this.setState({
      allQuestions: aleatoryQuestions([correctAnswer, ...incorrectAnswers]),
      category,
      correctAnswer,
      difficulty,
      incorrectAnswers,
      question: gameQuestion,
    });
  }

  render() {
    const { category, question, difficulty,
      allQuestions, correctAnswer, incorrectAnswers } = this.state;
    return (
      <section>
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        <h3>{difficulty}</h3>
        <div data-testid="answer-options">
          {allQuestions.map((gameAlternative, index) => {
            if (gameAlternative === correctAnswer) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                >
                  {gameAlternative}
                </button>
              );
            }

            let position = 0;
            incorrectAnswers.forEach((incorrectAnswer, indexOfIncorrectAnswers) => {
              if (incorrectAnswer === gameAlternative) position = indexOfIncorrectAnswers;
            });
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${position}` }
              >
                {gameAlternative}
              </button>
            );
          })}
        </div>
      </section>
    );
  }
}

GameQuestions.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameQuestions;
