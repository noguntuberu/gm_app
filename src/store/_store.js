/** */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './_reducer';
import persister from './_persister';
import rootSaga from './sagas/_root';

const saga = createSagaMiddleware();
const initial_store_state = persister.initializeStore();
const store = createStore( reducer, initial_store_state, applyMiddleware(saga));

saga.run(rootSaga);
store.subscribe(() => {
    const state = store.getState();
    persister.saveStoreState(state);
    console.log(state);
});

export default store;