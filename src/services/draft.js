/** */
import { urls } from './_url';
import { apiPost, apiPut, apiDelete } from './_http';

/** */
const base_url = `${urls.mailing}/drafts`;

export const create = async (options = {}) => {
    return await apiPost(`${base_url}`, { ...options });
}

export const deleteById = async (id, options = {}) => {
    return await apiDelete(`${base_url}/${id}`, { ...options });
}

export const updateById = async (id, options = {}) => {
    return await apiPut(`${base_url}/${id}`, { ...options });
}