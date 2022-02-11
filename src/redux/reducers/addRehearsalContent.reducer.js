const addRehearsalContent = (state = [], action) => {
    switch(action.type) {
        case 'SET_ADDED_REHEARSAL_CONTENT':
            return action.payload
    }
    return state;
}

export default addRehearsalContent;