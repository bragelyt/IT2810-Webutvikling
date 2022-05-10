const initialState = {
    search: "",
    minBeds: 0,
    minNights: 20,
    sorter: "beds",
    pages: [0],
    item_chosen: null,
    favorites: null,
};

/** The reducer. Here you can find functions (action.type) for setting new state **/
const reducer =  (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case "SEARCH":
            newState.search = action.search;
            newState.minBeds = action.minBeds;
            newState.minNights = action.minNights;
            newState.sorter = action.sorter;
            break;
        case "ITEM_CHOSEN":
            newState.item_chosen = action.val;
            break;
        case "PAGES":
            newState.pages = action.pages;
            break;
        case "LAST_PAGE":
            newState.lastPage = action.val;
            break;
        case "SET_FAVORITES":
            newState.favorites = action.favorites;
            break;
        default:
            break;
    }

    return newState;
};

export default reducer;
