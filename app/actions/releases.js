const REQUEST_RELEASES = 'REQUEST_RELEASES';
const RECEIVE_RELEASES = 'RECEIVE_RELEASES';

// http://muteparrot.com/api/v1/releases/latest/?country=SE&limit=19&offset=0&stream=spotify
//

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

const fetchReleases = (category) => {
    return (dispatch, getState) => {
        let categoryState = getState().releasesByCategory[category];
        let url = `http://muteparrot.com/api/v1/releases/${category}/?country=SE&stream=spotify,itunes`;

        if (categoryState && categoryState.next) {
            url = categoryState.next;
        }

        console.log(`loading url ${url}`);

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
    requestReleases,
    receiveReleases,
    fetchReleases
};
