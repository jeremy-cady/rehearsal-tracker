const setSelectedArtistsList = (state = [], action) => {
    switch(action.type) {
        case 'SET_SELECTED_ARTISTS_LIST':
            return action.payload;
    }
    return state;
}

export default setSelectedArtistsList;