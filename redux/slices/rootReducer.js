import { combineReducers } from 'redux';
import userReducer from './userReducer';
import doctorReducer from './doctorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    doctor: doctorReducer,
});

export default rootReducer;
