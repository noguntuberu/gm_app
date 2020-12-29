/** */
export const READ_MANY_AUDIENCES = 'read multiple AUDIENCES.';
export const READ_ONE_AUDIENCE = 'read one AUDIENCE.';

export const ADD_MANY_AUDIENCES_TO_STORE = 'add multiple AUDIENCES to atore.';
export const ADD_ONE_AUDIENCE_TO_STORE = 'add one AUDIENCE to store.';

/** */
export const readManyAudiences = (payload) => ({
    type: READ_MANY_AUDIENCES,
    payload,
});

export const readOneAudience = (payload) => ({
    type: READ_ONE_AUDIENCE,
    payload,
});

export const addManyAudiencesToStore = (payload) => ({
    type: ADD_MANY_AUDIENCES_TO_STORE,
    payload,
});

export const addOneAudienceToStore = (payload) => ({
    type: ADD_ONE_AUDIENCE_TO_STORE,
    payload,
});