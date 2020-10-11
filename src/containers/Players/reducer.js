import {GET_PLAYERS} from './actions';

export const playerReducer = (state, action) => {
switch (action.type) {
    case GET_PLAYERS:
    return {
        ...state,
        players: action.payload
    };
    default:
    return state;
}
};