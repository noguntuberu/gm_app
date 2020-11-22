/** */
import { ADD_DATA_TO_STORE, REM_DATA_FROM_STORE, UPD_DATA_IN_STORE } from '../actions/user-data';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_DATA_TO_STORE:
            return {
                ...payload,
            };
        case REM_DATA_FROM_STORE:
            return {};
        case UPD_DATA_IN_STORE:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}