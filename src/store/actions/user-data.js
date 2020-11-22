/** */

export const ACTIVATE_ACCOUNT = 'activate an new account.';
export const CREATE_ACCOUNT = 'create a new account.';
export const LOGIN = 'log into an account.';
export const LOGOUT = 'log out of an account.';
export const RECOVER_PASSWORD = 'Recover Password.';
export const RESET_PASSWORD = 'Reset Password.';

export const ADD_DATA_TO_STORE = 'add credentials to store.';
export const REM_DATA_FROM_STORE = 'remove credentials from store.';
export const UPD_DATA_IN_STORE = 'update credentials in store.';


export const activateAccount = data => ({
    type: ACTIVATE_ACCOUNT,
    payload: data,
});

export const login = (data) => ({
    type: LOGIN,
    payload: data,
});

export const recoverPassword = (data) => ({
    type: RECOVER_PASSWORD,
    payload: data,
});

export const resetPassword = (data) => ({
    type: RESET_PASSWORD,
    payload: data,
});

export const signup = (data) => ({
    type: CREATE_ACCOUNT,
    payload: data,
});

//
export const addDataToStore = data => ({
    type: ADD_DATA_TO_STORE,
    payload: data,
});