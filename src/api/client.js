// to import value from environment
// const API_BASE_URL =  import.meta.env.API_BASE_URL

const API_BASE_URL = "http://localhost:9000"

async function request(endpoint, options = {}) {
    
    // array destructuring
    const {
        method = "GET",
        body,
        headers = {},
        signal,
    } = options;

    const config = {
        method,
        headers: {
            Accept: "application/json",
            ...headers,
        },
        signal, };

    if (body !== undefined && body !== null) {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    // check the response
    if (response.status === 204) {
        return null
    }

    let data = null;

    try {
        data = await response.json();
        // if the data get resolved return data.
        return data;

    }catch{
        console.log("Response doesn't contain JSON.")
    }

    if (!response.ok) {
        const error = new Error(
            data?.message || `Request failed with status ${response.status}`
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }
}

export const api = {
    // defind get method with endpoint we can use
    // it to get information
    get: (endpoint, options = {}) => 
        request(endpoint, {...options, method: "GET",}),
    post: (endpoint, options = {}) =>
        request(endpoint, {...options, method: "POST"}),
}