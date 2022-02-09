const rehearsalReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REHEARSALS':
        return action.payload;
    }
    return state;
  };
  
  
  export default rehearsalReducer;