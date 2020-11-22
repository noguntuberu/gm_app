/** */
import { ADD_MANY_CONTACTS_TO_STORE, ADD_ONE_CONTACT_TO_STORE } from '../actions/contact';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_MANY_CONTACTS_TO_STORE:
            return {
                ...state,
                ...payload.reduce((contacts, contact) => ({
                    ...contacts,
                    [contact.id] : contact,
                }), {}),
            };
        case ADD_ONE_CONTACT_TO_STORE:
            return {
                ...state,
                [payload.id] : payload,
            }
        default:
            return state;
    }
}