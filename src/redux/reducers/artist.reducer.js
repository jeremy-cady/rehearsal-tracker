const artistReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARTISTS':
            return action.payload;
    }
    return state;
}


export default artistReducer;