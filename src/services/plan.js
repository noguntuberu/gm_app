/** */
import { urls } from './_url';
import { apiGet } from './_http';

/** */
const base_url = `${urls.users}/plans`;

export const read = async (options = {}) => {
    return await apiGet(base_url, { ...options });
}