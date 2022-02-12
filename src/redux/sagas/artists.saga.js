import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* fetchArtists() {
    console.log('made it to fetchArtists');
     try{const response = yield axios.get('/api/artists')
     yield put({
         type: 'SET_ARTISTS',
         payload: response.data
     })}
     catch (error) {
         console.error('SET_ARTISTS failed');
     }
}



function* createArtist(action) {
    console.log('made it to createArtist');

    yield axios.post('/api/artists', action.payload);

    yield put({
        type: 'FETCH_ARTISTS'
    });
}


function* markArtistSelected(action) {
    console.log('made it to addArtistToRehearsal');
    
    yield axios.put(`/api/artists/${action.payload.id}`, action.payload);
}


function* artistSaga() {
    yield takeEvery('CREATE_ARTIST', createArtist);
    yield takeEvery('FETCH_ARTISTS', fetchArtists);
    yield takeEvery('MARK_ARTIST_SELECTED', markArtistSelected);
}

export default artistSaga;