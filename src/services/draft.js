/** */
import { urls } from './_url';
import { apiPost, apiPut } from './_http';

/** */
const base_url = `${urls.mailing}/drafts`;

export const create = async (options = {}) => {
    return await apiPost(`${base_url}`, { ...options });
}

export const updateById = async (id, options) => {
    return await apiPut(`${base_url}/${id}`, { ...options });
}