import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import LoginForm from "../../components/LoginForm/LoginForm";


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


function* fetchProductionRehearsals(action) {
    console.log('made it to fetchProductionRehearsals');
    try {
        const response = yield axios.get(`/api/rehearsal/${action.payload}`)

        yield put({
            type: 'SET_PRODUCTION_REHEARSALS',
            payload: response.data
        })}
        catch (error){
            console.log('SET_PRODUCTION_REHEARSALS failed');
        }
}



function* createRehearsal(action) {
    console.log('made it to createRehearsal');

    console.log('action.payload.production_id is:', action.payload.production_id);
    
    
    yield axios.post('/api/rehearsal', action.payload);

    yield put ({
        type: 'FETCH_PRODUCTION_REHEARSALS',
        payload: action.payload.production_id
    });
}


function* addRehearsalContent(action) {
    console.log('made it to addRehearsalContent');
    console.log('action.payload is:', action.payload);
    
    yield axios.put(`/api/rehearsal/${action.payload.id}`, action.payload);

    yield put({
        type: 'FETCH_REHEARSALS'
    })
    
}


function* deleteRehearsal(action) {
    console.log('made it to deleteRehearsal', action.payload.id);
    
    yield axios.delete(`/api/rehearsal/${action.payload.id}`);

    yield put({
        type: 'FETCH_REHEARSALS'
    })
}


function* rehearsalSaga() {
    yield takeEvery('FETCH_REHEARSALS', fetchRehearsals);
    yield takeEvery('CREATE_REHEARSAL', createRehearsal);
    yield takeEvery('ADD_REHEARSAL_CONTENT', addRehearsalContent);
    yield takeEvery('FETCH_PRODUCTION_REHEARSALS', fetchProductionRehearsals);
    yield takeEvery('DELETE_REHEARSAL', deleteRehearsal);
}

export default rehearsalSaga;