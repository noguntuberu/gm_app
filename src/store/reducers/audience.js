/** */
import { ADD_MANY_AUDIENCES_TO_STORE, ADD_ONE_AUDIENCE_TO_STORE, LOAD_AUDIENCES } from '../actions/audience';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_MANY_AUDIENCES_TO_STORE:
            return {
                ...state,
                ...payload.reduce((audiences, audience) => ({
                    ...audiences,
                    [audience.id]: audience,
                }), {}),
            };
        case ADD_ONE_AUDIENCE_TO_STORE:
            return {
                ...state,
                [payload.id]: payload,
            };
        case LOAD_AUDIENCES:
            return {
                ...payload.reduce((audiences, audience) => ({
                    ...audiences,
                    [audience.id]: audience,
                }), {}),
            }
        default:
            return state;
    }
}