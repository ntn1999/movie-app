import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from '@/store/actions/root.saga';
import movieReducer from '@/store/reducers/movie.reducer';
import cartReducer from '@/store/reducers/cart.reducer';

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
