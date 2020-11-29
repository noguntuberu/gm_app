/** */
import { ADD_MANY_CONTACTS_TO_STORE, ADD_ONE_CONTACT_TO_STORE, REMOVE_MANY_CONTACTS_FROM_STORE, REMOVE_ONE_CONTACT_FROM_STORE } from '../actions/contact';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_MANY_CONTACTS_TO_STORE:
            return {
                ...state,
                ...payload.reduce((contacts, contact) => ({
                    ...contacts,
                    [contact.id]: contact,
                }), {}),
            };
        case ADD_ONE_CONTACT_TO_STORE:
            return {
                ...state,
                [payload.id]: payload,
            }
        case REMOVE_MANY_CONTACTS_FROM_STORE:

            return {

            }
        case REMOVE_ONE_CONTACT_FROM_STORE:
            let current_state = state;
            delete current_state[payload];

            return { ...current_state };
        default:
            return state;
    }
}