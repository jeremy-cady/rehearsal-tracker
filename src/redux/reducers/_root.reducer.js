import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import productions from './production.reducer'
import setSelectedProduction from './setSelectedProduction.reducer';
import rehearsals from './rehearsal.reducer'
import setSelectedRehearsal from './setSelectedRehearsal.reducer'
import artistReducer from './artist.reducer';
import setSelectedArtist from './setSelectedArtist.reducer';
import setSelectedArtistsList from './setSelectedArtistsList.reducer';
import setProductionRehearsals from './setProductionRehearsals.reducer';
import setArtistsForRehearsal from './setArtistsForRehearsal.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  productions,
  setSelectedProduction,
  rehearsals,
  setSelectedRehearsal,
  artistReducer,
  setSelectedArtist,
  setSelectedArtistsList,
  setProductionRehearsals,
  setArtistsForRehearsal,
});

export default rootReducer;
