/** */
import { urls } from './_url';
import { apiGet, apiPost } from './_http';

/** */
const base_url = `${urls.users}/guests`;


export const activate = async (id, options = {}) => {
    return apiGet(`${base_url}/activation/${id}`, { ...options });
}

export const login = async (options = {}) => {
    return apiPost(`${base_url}/login`, { ...options });
}

export const recoverPassword = async (options = {}) => {
    return apiPost(`${base_url}/password/recover`, { ...options });
}

export const resetPassword = async (options = {}) => {
    return apiPost(`${base_url}/password/reset`, { ...options });
}

export const signup = async (options = {}) => {
    return apiPost(`${base_url}/register`, { ...options });
}
