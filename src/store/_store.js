/** */
import { createStore } from 'redux';
import reducer from './_reducer';
import persister from './_persister';

const initial_store_state = persister.initializeStore();
const store = createStore( reducer, initial_store_state);

store.subscribe(() => {
    const state = store.getState();
    const keys = ['metadata', 'user_data', 'header'];
    persister.saveStoreState(state, keys);
});

export default store;