import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* fetchRehearsals() {
    try {const response = yield axios.get('/api/rehearsal')
    yield put({
        type: 'SET_REHEARSALS',
        payload: response.data
    })}
    catch (error){
        console.error('SET_REHEARSALS failed');
    }
}

function* createRehearsal(action) {
    console.log('made it to createRehearsal');
    
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