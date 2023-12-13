import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const listMovieInCart = [] as TListMovies;

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		listMovieInCart,
		totalMovieInCart: 0,
		totalPriceInCart: 0,
		removeMovieById: 0,
	},
	reducers: {
		/**
		 * FOR CHECK IS MOVIE IN CART?
		 */
		setListMovieInCart: (state, action: PayloadAction<TListMovies>) => {
			state.listMovieInCart = action.payload;
		},
		setTotalMovieInCart: (state, action: PayloadAction<number>) => {
			state.totalMovieInCart = action.payload;
		},
		setTotalPriceInCart: (state, action: PayloadAction<number>) => {
			state.totalPriceInCart = action.payload;
		},
		setRemoveMovieById: (state, action: PayloadAction<number>) => {
			state.removeMovieById = action.payload;
		},
	},
});

export const { setListMovieInCart, setTotalMovieInCart, setTotalPriceInCart, setRemoveMovieById } = cartSlice.actions;
export default cartSlice.reducer;
