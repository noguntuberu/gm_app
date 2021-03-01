/** */
import { urls } from './_url';
import { apiGet, apiPost, } from './_http';

/** */
const base_url = `${urls.mailing}/campaigns`;

export const create = async (options = {}) => {
    return await apiPost(`${base_url}`, { ...options });
}

export const read = async (options = {}) => {
    return await apiGet(`${base_url}`, { ...options });
}

export const readById = async (id, options = {}) => {
    return await apiGet(`${base_url}/${id}`, { ...options });
}

export const search = async (keys, keyword, options = {}) => {
    return await apiGet(`${base_url}/search/${keys}/${keyword}`, { ...options });
}