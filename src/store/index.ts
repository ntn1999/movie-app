import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/store/movie.reducer';
import cartReducer from '@/store/cart.reducer';

const store = configureStore({
	reducer: {
		movie: movieReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
