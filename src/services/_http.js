/** */
import axios from 'axios';

/** */
const extractErrorMessage = e => {
    let error_message = `An error occurred. Please try again later.`;
    if (e && e.response && e.response.data) {
        error_message = e.response.data.error;
    }

    return error_message;
}

const DEFAULT_ERR = (error) => ({
    error: extractErrorMessage(error),
    payload: null,
})

/** */
export const apiDelete = async (uri, options = {}) => {
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

        return request.data;
    } catch (e) {
        return DEFAULT_ERR(e);
    }
}

export const apiGet = async (uri, options = {}) => {
    try {
        const { token, query_string } = options;
        const request = await axios.get(`${uri}?${query_string || ''}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return request.data;
    } catch (e) {
        return DEFAULT_ERR(e);
    }
}

export const apiPost = async (uri, options = {}) => {
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
        return DEFAULT_ERR(e);
    }
}

export const apiPut = async (uri, options = {}) => {
    try {
        const { data, token, } = options;
        const request = await axios.put(`${uri}`, data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return request.data;
    } catch (e) {
        return DEFAULT_ERR(e);
    }
}