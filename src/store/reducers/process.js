/** */
/** */
import { SET_PROCESS } from '../actions/process';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_PROCESS:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}