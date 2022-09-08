export const PLAYER_REQUEST = 'PLAYER_REQUEST';

export function playerReducer(payload) {
  return {
    type: PLAYER_REQUEST,
    payload,
  };
}
