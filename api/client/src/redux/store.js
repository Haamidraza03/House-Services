import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import spReducer from './sp/spSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({user: userReducer, sp: spReducer});

const persistConfig = {
    key:'root',
    version:1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
});


export const persistor = persistStore(store);