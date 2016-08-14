const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';

const requestCountries = () => {
    return {
        type: REQUEST_COUNTRIES,
    }
}

const receiveCountries = (json) => {
    return {
        type: RECEIVE_COUNTRIES,
        countries: json.objects
    }
}

const fetchCountries = () => {
    return (dispatch, getState) => {
        let url = `http://muteparrot.com/api/v1/countries/`;

        dispatch(requestCountries());
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveCountries(json))
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

export {
    REQUEST_COUNTRIES,
    RECEIVE_COUNTRIES,
    fetchCountries,
};
