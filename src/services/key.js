/** */
import { urls } from './_url';
import { apiGet, apiPost,} from './_http';

/** */
const base_url = `${urls.keys}`;
export const create = async (options = {}) => {
    return await apiPost(`${base_url}`, { ...options });
}

export const readById = async (id, options = {}) => {
    return await apiGet(`${base_url}/${id}`, { ...options });
}