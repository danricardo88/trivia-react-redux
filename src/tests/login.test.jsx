import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const NAME_TEST_ID = 'input-player-name';
const EMAIL_TEST_ID = 'input-gravatar-email';
const BTN_TEST_ID = 'btn-play';
const EMAIL = 'test@test.com';
const NAME = 'Ada Lovalace';

describe('Login test', () => {
  it('testing login itens', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const aboutH2 = screen.getByRole('heading', { name: 'Trivia' }, { level: 2 });
    const name = screen.getByTestId(NAME_TEST_ID);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const btn = screen.getByTestId(BTN_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(aboutH2).toBeInTheDocument();

    userEvent.click(btn);
    expect(email).toHaveValue('');
    expect(name).toHaveValue('');

    userEvent.type(email, EMAIL);
    userEvent.type(name, NAME);
    expect(email).toHaveValue(EMAIL);
    expect(name).toHaveValue(NAME);

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/main');

    const { player } = store.getState();
    console.log(player);
    expect(player.name).toBe(NAME);
  });
  it('Main test', () => {

  });
});
