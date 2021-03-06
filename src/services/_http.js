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
        const { data, token, } = options;
        const request = await axios.delete(`${uri}`, {
            data,
            headers: {
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

export const TinyMCEUpload = async (uri, success, failure, progress, options = {}) => {
    const { data, token } = options;

    axios.post(uri, data, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        responseType: 'stream',
    }).then(response => {
        success(response.data.location);
    }).catch(e => {
        failure(`[Uplod Error]`, { remove: true })
    })
};