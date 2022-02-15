const setProductionRehearsals = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTION_REHEARSALS':
        return action.payload;
    }
    return state;
  };
  
  
  export default setProductionRehearsals;