/** */
import axios from 'axios';

class Request {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.getTokenFromStore()}`,
        };
    }

    getTokenFromStore() {
        const store = JSON.parse(localStorage.getItem('go-mailer-store'));
        const { user_data } = store;
        return user_data.token;
    }

    /** */
    setHeaders(headers) {
        this.headers = {
            ...this.headers,
            ...headers,
        };
        return this;
    }

    /** */
    async get(uri) {
        return axios
            .get(uri, {
                headers: { ...this.headers },
            })
            .then(response => response.data)
            .catch(error => error);
    }

    async post(uri, payload) {
        return fetch(uri, {
            body: JSON.stringify(payload),
            headers: { ...this.headers },
            method: 'POST',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
    }

    async put(uri, payload) {
        return (await axios.put(uri, payload, {
            headers: { ...this.headers },
        }));
    }

    async delete(uri, payload) {
        return (await axios.delete(uri, {
            headers: { ...this.headers },
        }));
    }
}

export default Request;