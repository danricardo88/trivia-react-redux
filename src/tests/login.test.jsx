import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
 
 
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
 
describe('Test the <Login /> component', () => {
 it('Tests if clicking the settings button redirects the user to the settings page', () => {
   const { history } = renderWithRouterAndRedux(<App />);
 
   const settingsButton = screen.getByRole('button', { name: /settings/i });
   expect(settingsButton).toBeInTheDocument();
 
   userEvent.click(settingsButton);
 
   expect(history.location.pathname).toBe('/settings');
 });
 
 it('Tests if, when filling in the inputs correctly, the play button is enabled', () => {
   renderWithRouterAndRedux(<App />);
 
   const playButton = screen.getByRole('button', { name: /play/i });
   const emailLabel = screen.getByLabelText(/email/i);
   const nameLabel = screen.getByLabelText(/name/i);
   const emailInput = screen.getByTestId('input-gravatar-email');
   const nameInput = screen.getByTestId('input-player-name');
 
   expect(playButton).toBeInTheDocument();
   expect(emailLabel).toBeInTheDocument();
   expect(nameLabel).toBeInTheDocument();
 
   userEvent.type(emailLabel, 'usuario@usuario.com');
   userEvent.type(nameLabel, 'usuario');
 
   expect(emailInput.value).toBe('usuario@usuario.com')
   expect(nameInput.value).toBe('usuario')
 });
 
 it('Tests if when clicking on the play button the user is redirected to the Main page', async () => {
   const { history } = renderWithRouterAndRedux(<App />);
 
   const playButton = screen.getByRole('button', { name: /play/i });
   const emailLabel = screen.getByLabelText(/email/i);
   const nameLabel = screen.getByLabelText(/name/i);
 
   expect(playButton).toBeInTheDocument();
   expect(emailLabel).toBeInTheDocument();
   expect(nameLabel).toBeInTheDocument();
 
   userEvent.type(emailLabel, 'usuario@usuario.com');
   userEvent.type(nameLabel, 'usuario');
 
   expect(playButton).not.toBeDisabled();
 
   userEvent.click(playButton);

   await waitFor(async () => {
     const nameParagraph = await screen.findByText(/Loading.../i);
   
     expect(nameParagraph).toBeInTheDocument();
   }, {timeout: 2000})
 
   expect(history.location.pathname).toBe('/main');
 });
});


// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import fetchToken from '../services/triviaToken';
// import Main from '../pages/Main';

// const NAME_TEST_ID = 'input-player-name';
// const EMAIL_TEST_ID = 'input-gravatar-email';
// const BTN_TEST_ID = 'btn-play';
// const EMAIL = 'test@test.com';
// const NAME = 'Ada Lovalace';

// describe('Login test', () => {
//   it('testing login itens', async () => {


//     const token = { token: '8d276e87db904a2d50ef6f66a8ea8a1b7184fd266f9f95a1b8eea9944d30d87f'};
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(token),
//     });

//     const { history, store } = renderWithRouterAndRedux(<App />);
//     const aboutH2 = screen.getByRole('heading', { name: 'Trivia' }, { level: 2 });
//     const name = screen.getByTestId(NAME_TEST_ID);
//     const email = screen.getByTestId(EMAIL_TEST_ID);
//     const btn = screen.getByTestId(BTN_TEST_ID);


//     expect(email).toBeInTheDocument();
//     expect(name).toBeInTheDocument();
//     expect(aboutH2).toBeInTheDocument();

//     userEvent.click(btn);
//     expect(email).toHaveValue('');
//     expect(name).toHaveValue('');

//     userEvent.type(email, EMAIL);
//     userEvent.type(name, NAME);
//     expect(email).toHaveValue(EMAIL);
//     expect(name).toHaveValue(NAME);

//     userEvent.click(btn);
//     await fetchToken();
//     expect(fetch).toHaveBeenCalledTimes(2);
//     expect(history.location.pathname).toBe('/main')

//     const { player } = store.getState();

//     expect(player.name).toBe(NAME);
//   });
//   it('Main test', () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     const btn = screen.getByTestId('btn-settings')
//     userEvent.click(btn);
//     expect(history.location.pathname).toBe('/settings')
//   });

//   it('Header test', () => {
//     renderWithRouterAndRedux(<Main />);
//     const headerImg = screen.getByRole('img', {  name: /profile pic/i})
//     expect(headerImg).toBeInTheDocument();

//   });
// });
