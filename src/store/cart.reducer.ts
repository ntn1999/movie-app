import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const listMovieInCart = [] as TListMovies;

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		listMovieInCart,
	},
	reducers: {
		/**
		 * FOR CHECK IS MOVIE IN CART?
		 */
		setListMovieInCart: (state, action: PayloadAction<TListMovies>) => {
			state.listMovieInCart = action.payload;
		},
	},
});

export const { setListMovieInCart } = cartSlice.actions;
export default cartSlice.reducer;
