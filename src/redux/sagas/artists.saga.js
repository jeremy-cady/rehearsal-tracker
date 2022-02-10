import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* createArtist(action) {
    console.log('made it to createArtist');

    yield axios.post('/api/artists', action.payload);

    yield put({
        type: 'FETCH_ARTISTS'
    });
}


function* artistSaga() {
    yield takeEvery('CREATE_ARTIST', createArtist);
}

export default artistSaga;