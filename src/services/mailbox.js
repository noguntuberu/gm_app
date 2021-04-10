/** */
import { urls } from './_url';
import { apiGet, apiPost } from './_http';

/** */
const base_url = `${urls.users}/mailboxes`;

export const initiate_verification = async (options) => {
    return await apiPost(`${base_url}/initialization`, { ...options });
}

export const verify = async (id, options) => {
    return await apiPost(`${base_url}/verification/${id}`, { ...options });
}

export const read = async (options = {}) => {
    return await apiGet(`${base_url}`, { ...options });
}