/** */
import { urls } from './_url';
import { apiPost, TinyMCEUpload } from './_http';

/** */
const base_url = `${urls.files}`;

export const extractHtmlContent = async (options) => {
    return await apiPost(`${base_url}/html/extraction`, { ...options });
}

export const uploadTinyMCEImage = async (success, failure, progress, options) => {
    TinyMCEUpload(`${base_url}/images`, success, failure, progress, options);
}