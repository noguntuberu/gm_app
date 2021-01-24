/** */
import { urls } from './_url';
import { apiGet} from './_http';

/** */
const base_url = `${urls.users}/templates`;

export const download = async (type, options = {}) => {
    return await apiGet(`${base_url}/${type}`, { ...options });
}