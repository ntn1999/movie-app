import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const carts: TCart[] = [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		carts,
	},
	reducers: {
		/**
		 * FOR CHECK IS MOVIE IN CART?
		 */
		setCarts: (state, action: PayloadAction<TCart>) => {
			const found: TCart | undefined = state.carts.find(
				(cart: TCart) => cart.movie_id === action.payload.movie_id,
			);

			// prevent set into state if existed
			if (found) return;
			else state.carts = [...state.carts, action.payload];
		},
	},
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
