import { createReducer } from 'redux-create-reducer';
import recycleState from 'redux-recycle';
import {
} from '../messages';

export const initialState = {};

const reducer = createReducer(initialState, {
});

export default recycleState(reducer, [], initialState);