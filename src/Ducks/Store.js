import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import UserReducer from './Reducers/UserReducer';
import PostsReducer from './Reducers/PostsReducer';


const rootReducer = combineReducers({
    UserReducer,
    PostsReducer
});

export default createStore(rootReducer, applyMiddleware(promise))