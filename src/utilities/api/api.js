/** */
import axios from 'axios';
import hosts from './uri';

const DEFAULT_ERR = (e) => ({
    error: e,
    payload: null,
})

export const URLS = {
    campaigns: `${hosts.mailing}/campaigns`,
    contacts: `${hosts.users}/contacts`,
    mailing_lists: `${hosts.users}/mailing-lists`,
}


export const apiDelete = async (uri,  options = {}) => {
    try {
        const { data, token, query_string } = options;
        const request = await axios.delete(`${uri}?${query_string || ''}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return request.data;
    } catch (e) {
        const error = e.response.data ? e.response.data.error : e.message;
        return DEFAULT_ERR(error);
    }
}

export const apiGet = async (uri,  options = {}) => {
    try {
        const { token, query_string } = options;
        const request = await axios.get(`${uri}?${query_string || ''}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return request.data;
    } catch (e) {
        const error = e.response.data ? e.response.data.error : e.message;
        return DEFAULT_ERR(error);
    }
}

export const apiPost = async (uri,  options = {}) => {
    try {
        const { data, headers, token, } = options;
        const request = await axios.post(`${uri}`, data, {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            }
        });

        return request.data;
    } catch (e) {
        const error = e.response.data ? e.response.data.error : e.message;
        return DEFAULT_ERR(error);
    }
}

export const apiPut = async (uri,  options = {}) => {
    try {
        const { data, token, } = options;
        const request = await axios.put(`${uri}`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return request.data;
    } catch (e) {
        const error = e.response.data ? e.response.data.error : e.message;
        return DEFAULT_ERR(error);
    }
}