import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchProductions() {
    console.log('made it to fetchProductions');
    
    // get data from the API
    const response = yield axios.get('/api/production');

    // send data to a reducer
    yield put({
        type: 'SET_PRODUCTIONS',
        payload: response.data
    });
}


function* productionSaga() {
    // handle all incoming 'FETCH_PRODUCTIONS' requests
    yield takeEvery('FETCH_PRODUCTIONS', fetchProductions);
}

export default productionSaga;