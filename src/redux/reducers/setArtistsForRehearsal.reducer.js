const setArtistsForRehearsal = (state=[], action) => {
    switch (action.type) {
        case 'SET_ARTISTS_FOR_REHEARSAL':
            return action.payload;
    }
    return state;
}


export default setArtistsForRehearsal;