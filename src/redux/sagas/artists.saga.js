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



function* fetchSelectedArtistsList() {
    console.log('made it to fetchSelectedArtists');
    try{const response = yield axios.get('/api/artists/selected')
        yield put({
            type: 'SET_SELECTED_ARTISTS_LIST',
            payload: response.data
        })}
        catch (error) {
            console.error('SET_SELECTED_ARTISTS_LIST failed');
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
    console.log('made it to markArtistSelected', action.payload);
    
    yield axios.post(`/api/rehearsalsArtists`, action.payload);

    yield put({
        type: 'FETCH_ARTISTS_FOR_REHEARSAL',
        payload: action.payload.rehearsal_id
    })
}


function* fetchArtistsForRehearsal(action){
    console.log('made it to fetchArtistsForRehearsal');
    console.log('action.payload is:', action.payload);
    

    try{const response = yield axios.get(`/api/rehearsalsArtists/${action.payload}`)
        yield put({
            type: 'SET_ARTISTS_FOR_REHEARSAL',
            payload: response.data
        })}
        catch (error) {
            console.error('SET_ARTISTS_FOR_REHEARSAL failed');
        }
    
}


function* artistSaga() {
    yield takeEvery('CREATE_ARTIST', createArtist);
    yield takeEvery('FETCH_ARTISTS', fetchArtists);
    yield takeEvery('MARK_ARTIST_SELECTED', markArtistSelected);
    yield takeEvery('FETCH_SELECTED_ARTISTS_LIST', fetchSelectedArtistsList),
    yield takeEvery('FETCH_ARTISTS_FOR_REHEARSAL', fetchArtistsForRehearsal)
}

export default artistSaga;