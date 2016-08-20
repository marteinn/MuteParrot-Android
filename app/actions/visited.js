const MARK_RELEASE_AS_VISITED = 'MARK_RELEASE_AS_VISITED';

const markReleaseAsVisited = (id) => {
    return {
        type: MARK_RELEASE_AS_VISITED,
        id
    }
}

export {
    MARK_RELEASE_AS_VISITED,
    markReleaseAsVisited,
}
