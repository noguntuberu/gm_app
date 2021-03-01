/** */
import { ADD_METADATA } from '../actions/metadata';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_METADATA:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}