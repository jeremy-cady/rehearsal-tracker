const setSelectedRehearsal = (state={}, action) => {
    switch(action.type) {
      case 'SET_SELECTED_REHEARSAL':
        return action.payload
    }
    return state
  }

  export default setSelectedRehearsal;