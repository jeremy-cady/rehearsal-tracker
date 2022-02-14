const setProductionRehearsals = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTION_REHEARSALS':
          console.log('action.payload is:', action.payload);
          
        return action.payload;
    }
    return state;
  };
  
  
  export default setProductionRehearsals;