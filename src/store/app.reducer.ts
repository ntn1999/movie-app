import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const listMovies = {} as IResponseMovies;
const movies = [] as TMovies[];
const movie = {} as TMovie;

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		listMovies,
		movies,
		movie,
	},
	reducers: {
		setListMovies: (state, action: PayloadAction<IResponseMovies>) => {
			state.listMovies = action.payload;
		},
		setMovies: (state, action: PayloadAction<TMovies[]>) => {
			state.movies = action.payload;
		},
		setMovie: (state, action: PayloadAction<TMovie>) => {
			state.movie = action.payload;
		},
	},
});

export const { setListMovies, setMovies, setMovie } = appSlice.actions;

export default appSlice.reducer;
