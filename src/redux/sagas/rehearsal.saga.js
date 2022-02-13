import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* fetchRehearsals() {
    console.log('made it to fetchRehearsals');
    
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


function* addRehearsalContent(action) {
    console.log('made it to addRehearsalContent');
    console.log('action.payload is:', action.payload);
    
    yield axios.put(`/api/rehearsal/${action.payload.id}`, action.payload);
    
}


function* rehearsalSaga() {
    yield takeEvery('FETCH_REHEARSALS', fetchRehearsals);
    yield takeEvery('CREATE_REHEARSAL', createRehearsal);
    yield takeEvery('ADD_REHEARSAL_CONTENT', addRehearsalContent);
}

export default rehearsalSaga;