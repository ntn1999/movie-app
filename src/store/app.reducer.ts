import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const listMovies = {} as IResponseMovies;
const movies = [] as IMovies[];
const movie = {} as IMovie;

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
		setMovies: (state, action: PayloadAction<IMovies[]>) => {
			state.movies = action.payload;
		},
		setMovie: (state, action: PayloadAction<IMovie>) => {
			state.movie = action.payload;
		},
	},
});

export const { setListMovies, setMovies, setMovie } = appSlice.actions;

export default appSlice.reducer;
