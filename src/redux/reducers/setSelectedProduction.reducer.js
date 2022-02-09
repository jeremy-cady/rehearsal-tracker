const setSelectedProduction = (state={}, action) => {
    switch(action.type) {
      case 'SET_SELECTED_PRODUCTION':
        return action.payload
    }
    return state
  }

  export default setSelectedProduction;