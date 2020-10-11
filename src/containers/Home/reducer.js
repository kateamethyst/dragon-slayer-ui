import {SET_PLAYER_ID} from './actions';

export const dragonSlayerReducer = (state, action) => {
switch (action.type) {
    case SET_PLAYER_ID:
    return {
        ...state,
        player_id: action.payload
    };
    default:
    return state;
}
};