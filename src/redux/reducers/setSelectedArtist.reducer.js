const setSelectedArtist = (state = [], action) => {
    switch(action.type) {
        case 'SET_SELECTED_ARTIST':
            return action.payload
    }
    return state;
}

export default setSelectedArtist;