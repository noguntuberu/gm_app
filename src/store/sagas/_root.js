/** */
import { takeLatest } from 'redux-saga/effects';
import { CREATE_ACCOUNT, LOGIN, ACTIVATE_ACCOUNT, RECOVER_PASSWORD, RESET_PASSWORD } from '../actions/user-data';
import { READ_MANY_CAMPAIGNS } from '../actions/campaign';
import { CREATE_CONTACT, READ_CONTACTS, UPDATE_CONTACT, DELETE_CONTACT } from '../actions/contact'

import { createAccount, logIn, activateAccount, recoverPassword, resetPassword, } from './user-data';
import { readManyCampaigns } from './campaign';
import { createContact, readContacts, updateContact, deleteContact } from './contact';

export const server_uri = `http://localhost:7202`;

export default function* rootSaga() {
    yield takeLatest(ACTIVATE_ACCOUNT, activateAccount);
    yield takeLatest(CREATE_ACCOUNT, createAccount);
    yield takeLatest(LOGIN, logIn);
    yield takeLatest(RECOVER_PASSWORD, recoverPassword);
    yield takeLatest(RESET_PASSWORD, resetPassword);

    /** CAMPAIGNS */
    yield takeLatest(READ_MANY_CAMPAIGNS, readManyCampaigns);

    /** CONTACTS */
    yield takeLatest(CREATE_CONTACT, createContact);
    yield takeLatest(DELETE_CONTACT, deleteContact);
    yield takeLatest(READ_CONTACTS, readContacts);
    yield takeLatest(UPDATE_CONTACT, updateContact);
}