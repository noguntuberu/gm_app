/** */

export const ADD_METADATA = 'add metadata to store.';

export const addMetadata = data => ({
    type: ADD_METADATA,
    payload: data,
});