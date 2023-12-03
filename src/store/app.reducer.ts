import { ESearchValue } from '@/enums';
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
		// search
		searchInput: '',
		searchPage: 1,
		movieSearchQuery: '',
		searchByType: 'movie',
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
		setSearchInput: (state, action: PayloadAction<string>) => {
			state.searchInput = action.payload;
		},
		setSearchPage: (state, action: PayloadAction<number>) => {
			state.searchPage = action.payload;
		},
		setMovieSearchQuery: (state, action: PayloadAction<string>) => {
			state.movieSearchQuery = action.payload;
		},
		setSearchByType: (state, action: PayloadAction<string>) => {
			state.searchByType = action.payload;
		},
	},
});

export const {
	setListMovies,
	setMovies,
	setMovie,
	setSearchInput,
	setSearchPage,
	setMovieSearchQuery,
	setSearchByType,
} = appSlice.actions;

export default appSlice.reducer;
