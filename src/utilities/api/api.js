/** */
import axios from 'axios';
import hosts from './uri';

const DEFAULT_ERR = (error) => ({
    error,
    payload: null,
})

export const URLS = {
    campaigns: `${hosts.mailing}/campaigns`,
    contacts: `${hosts.users}/contacts`,
    guests: `${hosts.users}/guests`,
    mailing_lists: `${hosts.users}/mailing-lists`,
    plans: `${hosts.sales}/plans`,
    payments: `${hosts.sales}/payments`,
    templates: `${hosts.users}/templates`,
}

const extractErrorMessage = e => {
    let error_message = `An error occurred. Please try again later.`;
    if (e && e.response && e.response.data) {
        error_message = e.response.data.error;
    }

    return error_message;
}


export const apiDelete = async (uri,  options = {}) => {
    try {
        const { data, token, query_string } = options;
        const request = await fetch(`${uri}?${query_string || ''}`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        });

        return request;
    } catch (e) {
        return DEFAULT_ERR(extractErrorMessage(e));
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
        return DEFAULT_ERR(extractErrorMessage(e));
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
        return DEFAULT_ERR(extractErrorMessage(e));
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
        return DEFAULT_ERR(extractErrorMessage(e));
    }
}