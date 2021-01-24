/** */
import { urls } from './_url';
import { apiPost } from './_http';

/** */
const base_url = `${urls.users}/payments`;

export const verify = async (options = {}) => {
    return await apiPost(`${base_url}/rave/verification`, { ...options });
}