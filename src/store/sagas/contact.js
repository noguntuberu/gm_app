import { call, put, } from 'redux-saga/effects';
import { users_host } from './_config';
import Request from './_request';

import {
    CONTACT_CREATION,
    CONTACT_DELETION,
    CONTACT_READ,
    CONTACT_UPDATION,
    set_error,
    set_process,
} from '../actions/process';
const users_uri = `${users_host}/contacts`;

export function* createContact(action) {
    try {
        const payload = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.post],
            `${users_uri}`,
            { ...payload },
        );
        yield put(set_process(CONTACT_CREATION, response));
    } catch (e) {
        yield put(set_error(CONTACT_CREATION, e));
    }
}

export function* deleteContact(action) {
    try {
        const payload = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.delete],
            `${users_uri}/${payload}`,
            {},
        );
        yield put(set_process(CONTACT_DELETION, { ...response, id: payload }));
    } catch (e) {
        yield put(set_error(CONTACT_DELETION, e));
    }
}

export function* deleteContacts(action) {
    try {
        const payload = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.delete],
            `${users_uri}`,
            { ...payload },
        );
        yield put(set_process(CONTACT_CREATION, response));
    } catch (e) {
        yield put(set_error(CONTACT_CREATION, e));
    }
}

export function* readContacts(action) {
    try {
        const payload = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.get],
            `${users_uri}?${payload || ''}`,
        );
        yield put(set_process(CONTACT_READ, response));
    } catch (e) {
        yield put(set_error(CONTACT_READ, e));
    }
}

export function* updateContact(action) {
    try {
        const payload = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.put],
            `${users_uri}/${payload.id}`,
            payload,
        );
        yield put(set_process(CONTACT_UPDATION, response));
    } catch (e) {
        yield put(set_error(CONTACT_UPDATION, e));
    }
}
