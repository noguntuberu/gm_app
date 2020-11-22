/** */
import { call, put, } from 'redux-saga/effects';
import { ACCOUNT_ACTIVATION, set_process, set_error, SIGNUP_PROCESS, LOGIN_PROCESS, PWD_RECOVERY_PROCESS, PWD_RESET_PROCESS, } from '../actions/process';
import { users_host } from './_config';
import Request from './_request';
import { addDataToStore } from '../actions/user-data';

const guest_uri = `${users_host}/guests`;

export function* activateAccount(action) {
    try {
        const request = new Request();
        const response = yield call(
            [request, request.get],
            `${guest_uri}/activation/${action.payload}`,
        );
        yield put(set_process(ACCOUNT_ACTIVATION, response));
    } catch (e) {
        yield put(set_error(ACCOUNT_ACTIVATION, e));
    }
}

export function* createAccount(action) {
    try {
        const request = new Request();
        const response = yield call(
            [request, request.post],
            `${guest_uri}/register`,
            { ...action.payload },
        );
        yield put(set_process(SIGNUP_PROCESS, response));
    } catch (e) {
        yield put(set_error(SIGNUP_PROCESS, e));
    }
}

export function* logIn(action) {
    try {
        const request = new Request();
        const response = yield call(
            [request, request.post],
            `${guest_uri}/login`,
            { ...action.payload},
        );
        yield put(set_process(LOGIN_PROCESS, response));
    } catch (e) {
        yield put(set_error(LOGIN_PROCESS, e));
    }
}

export function* recoverPassword(action) {
    try {
        const request = new Request();
        const response = yield call(
            [request, request.post],
            `${guest_uri}/password/recover`,
            { ...action.payload},
        );
        yield put(set_process(PWD_RECOVERY_PROCESS, response));
    } catch (e) {
        yield put(set_error(PWD_RECOVERY_PROCESS, e));
    }
}

export function* resetPassword(action) {
    try {
        const request = new Request();
        const response = yield call(
            [request, request.post],
            `${guest_uri}/password/reset`,
            { ...action.payload},
        );
        yield put(set_process(PWD_RESET_PROCESS, response));
    } catch (e) {
        yield put(set_error(PWD_RESET_PROCESS, e));
    }
}
