import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* createRehearsal(action) {
    yield axios.post('/api/rehearsal', action.payload);

    yield put ({
        type: 'FETCH_REHEARSALS'
    });
}


function* rehearsalSaga() {
    yield takeEvery('FETCH_REHEARSALS', fetchRehearsals);
    yield takeEvery('CREATE_REHEARSAL', createRehearsal);
}

export default rehearsalSaga;