/** */
import { urls } from './_url';
import { apiPost } from './_http';

/** */
const base_url = `${urls.files}`;

export const extractHtmlContent = async (options) => {
    return await apiPost(`${base_url}/html/extraction`, { ...options });
}