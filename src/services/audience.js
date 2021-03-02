/** */
import { urls } from './_url';
import { apiDelete, apiGet, apiPost, apiPut } from './_http';

/** */
const base_url = `${urls.users}/mailing-lists`;

export const addContact = async (audience_id, options) => {
    return await apiPut(`${base_url}/${audience_id}/contacts`, { ...options });
}

export const create = async (options = {}) => {
    return await apiPost(`${base_url}`, { ...options });
}

export const deleteById = async (id, options) => {
    return await apiDelete(`${base_url}/${id}`, { ...options });
}

export const deleteContact = async (audience_id, options) => {
    return await apiDelete(`${base_url}/${audience_id}/contacts`, { ...options });
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

export const updateById = async (id, options) => {
    return await apiPut(`${base_url}/${id}`, { ...options });
}