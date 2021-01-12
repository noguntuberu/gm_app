/** */
import { ADD_SELECTED_PLAN } from '../actions/plan';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_SELECTED_PLAN:
            return {
                ...state,
                selected: payload,
            };
        default:
            return state;
    }
}