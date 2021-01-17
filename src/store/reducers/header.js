/** */
import { PAGE_TITLE } from '../actions/header';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case PAGE_TITLE:
            return {
                page_title: payload
            };
        default:
            return state;
    }
}