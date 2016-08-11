const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        id
    }
}

export {
    TOGGLE_FAVORITE,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    toggleFavorite,
};
