const REQUEST_COUNTRY = 'REQUEST_COUNTRY';
const RECEIVE_COUNTRY = 'RECEIVE_COUNTRY';

const requestCountry = () => {
    return {
        type: REQUEST_COUNTRY,
    }
}

const receiveCountry = (json) => {
    return {
        type: RECEIVE_COUNTRY,
        code: json.code
    }
}

const fetchCountry = () => {
    return (dispatch, getState) => {
        let url = `http://muteparrot.com/api/v1/user/country/`;

        dispatch(requestCountry());
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                console.log('loaded');
                dispatch(receiveCountry(json))
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

export {
    REQUEST_COUNTRY,
    RECEIVE_COUNTRY,
    fetchCountry,
};
