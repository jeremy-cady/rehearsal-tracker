const productionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTIONS':
        return action.payload;
    }
    return state;
  };
  
  
  export default productionReducer;