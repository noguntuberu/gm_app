/** */
import { urls } from './_url';
import { apiGet, apiPost, } from './_http';

/** */
const base_url = `${urls.mailing}/stats`;

export const read = async (options = {}) => {
    return await apiGet(`${base_url}`, { ...options });
}

export const readByCampaignId = async (id, options = {}) => {
    return await apiGet(`${base_url}/${id}`, { ...options });
}