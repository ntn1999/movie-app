import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/store/reducers/movie.reducer';
import cartReducer from '@/store/reducers/cart.reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './actions/root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		movie: movieReducer,
		cart: cartReducer,
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
