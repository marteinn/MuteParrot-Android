const REQUEST_RELEASES = 'REQUEST_RELEASES';
const RECEIVE_RELEASES = 'RECEIVE_RELEASES';
const INVALIDATE_RELEASES = 'INVALIDATE_RELEASES';

const requestReleases = (category) => {
    return {
        type: REQUEST_RELEASES,
        category
    }
}


const receiveReleases = (category, json) => {
    return {
        type: RECEIVE_RELEASES,
        meta: json.meta,
        releases: json.objects,
        receivedAt: Date.now(),
        category
    }
}

const invalidateReleases = (category) => {
    return {
        type: INVALIDATE_RELEASES,
        category
    }
}

const fetchReleases = (category) => {
    return (dispatch, getState) => {
        let countryCode = getState().country.code;
        let stream = getState().settings.stream;
        let categoryState = getState().releasesByCategory[category];
        let url = `http://muteparrot.com/api/v1/releases/${category}/?country=${countryCode}&stream=${stream}`;

        dispatch(requestReleases(category));
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(invalidateReleases(category))
                dispatch(receiveReleases(category, json))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

const fetchMoreReleases = (category) => {
    return (dispatch, getState) => {
        let countryCode = getState().country.code;
        let categoryState = getState().releasesByCategory[category];
        let url = categoryState.next;

        dispatch(requestReleases(category));
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveReleases(category, json))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export {
    REQUEST_RELEASES,
    RECEIVE_RELEASES,
    INVALIDATE_RELEASES,
    requestReleases,
    receiveReleases,
    fetchReleases,
    fetchMoreReleases,
};
