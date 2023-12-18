import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './redux/filters/filterSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, filterReducer);

const store = configureStore({
    reducer:{
        filters:persistedReducer
    }
})
const persistor= persistStore(store);
export { store,persistor};