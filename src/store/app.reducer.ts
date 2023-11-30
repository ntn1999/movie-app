import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppStateType = {
	listMovies: {},
	movies: [],
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setListMovies: (state, action: PayloadAction<any>) => {
			state.listMovies = action.payload;
			state.movies = action.payload.results;
		},
	},
});

export const { setListMovies } = appSlice.actions;

export default appSlice.reducer;
