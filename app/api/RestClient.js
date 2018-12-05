import axios from 'axios';

const getURLWithParams = cfg => {
    const url = cfg.url;
    let queryParams = null;
    /* istanbul ignore else */
    if (cfg.queryParams) {
        queryParams = cfg.queryParams;
    }

    return queryParams ? `${url}?${queryParams}` : url;
};

export default class RestClient {
    static get(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: config.headers
                }).then(response => {
                    const status = response.status;
                    const statusText = response.statusText;

                return response.json()
                            .then(json => ({ status, statusText, data: json }));
                }).catch(error => {
                    return {
                        status: 500,
                        statusText: `Error while fetching data from ${apiUrl}`,
                        error,
                };
        });
   }

    static getProfileImg(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: config.headers
                }).then(response => {
                    return response.text()
                    .then(imgData => imgData);
                }).catch(error => {
                    return {
                        status: 500,
                        statusText: `Error while fetching data from ${apiUrl}`,
                        error,
                };
        });
    }

    static post(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'POST',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data)
        }).then(response => {
        return response.json();
        }).then(text => {
            const status = text.status;
            const statusText = text.statusText;

        return { status, statusText, data: text };
            }).catch(error => {
                return {
                    status: 500,
                    statusText: `Error while fetching data from ${apiUrl}`,
                    error,
            };
        });
    }

    static authorizationPost(config) {
        const apiUrl = getURLWithParams(config);

        return axios({
            method: 'POST',
            url: apiUrl,
            withCredentials: 'include',
            data: config.data
        }).then(response => {
            const status = response.status;
            const statusText = response.statusText;

return { status, statusText, data: response.data, error: false };
            }).catch(error => {
                const errorDetails = error.response;
                const { message, status, error: statusText } = errorDetails.data || {};

            return { error: true, statusText, status, message };
        });
    }

    static put(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'PUT',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data),
        }).then(response => {
            const status = response.status;
            const statusText = response.statusText;

        return response.json()
                    .then(json => ({ status, statusText, data: json }));
        }).catch(error => {
            return {
                status: 500,
                statusText: `Error while fetching data from ${apiUrl}`,
                error,
            };
        });
}


    static delete(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'DELETE',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data),
        }).then(response => {
            const status = response.status;
            const statusText = response.statusText;

        return response.json()
                    .then(json => ({ status, statusText, data: json }));
        }).catch(error => {
            return {
                status: 500,
                statusText: `Error while fetching data from ${apiUrl}`,
                error,
            };
        });
    }

    static setContext(context) {
        this.context = context;
        this.headers = context.headers;
    }
}
