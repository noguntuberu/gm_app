/** */
export const SET_PROCESS = 'SET PROCESS VALUE IN STORE';

export const set_process = (name, payload) => ({
    type: SET_PROCESS,
    payload: {
        [name]: { ...payload },
    },
});

export const set_error = (name, error) => ({
    type: SET_PROCESS,
    payload: {
        [name]: {
            error: error.message,
            payload: null,
            success: false,
        }
    },
});

/** */
export const ACCOUNT_ACTIVATION = 'activate account';
export const LOGIN_PROCESS = 'login';
export const PWD_RECOVERY_PROCESS = 'password recovery process';
export const PWD_RESET_PROCESS = 'password reset process';
export const SIGNUP_PROCESS = 'signup';

/** CAMPAIGN */
export const READ_CAMPAIGN = 'read one or more campaigns.';

/** CONTACTS */
export const CONTACT_CREATION = 'contact creation.';
export const CONTACT_READ = 'contact retrieval.';
export const CONTACT_UPDATION = 'contact updation';