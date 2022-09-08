import { PLAYER_REQUEST } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_REQUEST: return {
    ...state,
    name: action.payload.name,
    gravatarEmail: action.payload.email,
  };
  default: return state;
  }
}

export default playerReducer;
