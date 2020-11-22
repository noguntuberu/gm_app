/** */
export const CREATE_CONTACT = 'create contact';
export const DELETE_CONTACT = 'delete contact';
export const READ_CONTACTS = 'read contacts';
export const UPDATE_CONTACT = 'update contact';

/** */
export const ADD_MANY_CONTACTS_TO_STORE = 'add many contacts to store';
export const ADD_ONE_CONTACT_TO_STORE = 'add one contact to store';
export const REMOVE_MANY_CONTACTS_FROM_STORE = 'remove many contacts from the store.';
export const REMOVE_ONE_CONTACT_FROM_STORE = 'remove a contact from the store.';

/** */
export const createContact = payload => ({
    type: CREATE_CONTACT,
    payload,
});

export const deleteContact = payload => ({
    type: REMOVE_ONE_CONTACT_FROM_STORE,
    payload,
});

export const deleteManyContacts = payload => ({
    type: REMOVE_MANY_CONTACTS_FROM_STORE,
    payload,
});

export const readContacts = payload => ({
    type: READ_CONTACTS,
    payload,
});

export const updateContact = payload => ({
    type: UPDATE_CONTACT,
    payload,
});

/** */

export const addManyContactsToStore = payload => ({
    type: ADD_MANY_CONTACTS_TO_STORE,
    payload,
});

export const addOneContactToStore = payload => ({
    type: ADD_ONE_CONTACT_TO_STORE,
    payload,
});