import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const listMovies = [] as TListMovies;
const movie = {} as TMovie;
const movieDetail = {} as TMovieDetail;

export const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		/**
		 * FOR DISPLAY
		 */
		listMovies,
		movie,
		movieDetail,

		/**
		 * FOR SEARCH
		 */
		searchInput: '',
		searchPage: 1,
		movieSearchQuery: '',
		searchByType: 'movie',
	},
	reducers: {
		/**
		 * FOR DISPLAY
		 */
		setListMovies: (state, action: PayloadAction<TListMovies>) => {
			state.listMovies = action.payload;
		},
		setMovie: (state, action: PayloadAction<TMovie>) => {
			state.movie = action.payload;
		},
		setMovieDetail: (state, action: PayloadAction<TMovieDetail>) => {
			state.movieDetail = action.payload;
		},

		// CUSTOM ACTIONS...
		setMovieIsInCartById: (state, action: PayloadAction<number>) => {
			state.listMovies.forEach((movie: TMovie) => {
				if (movie.id === action.payload) movie.isInCart = true;
				else return;
			});
		},

		/**
		 * FOR SEARCH
		 */
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
	/**
	 * FOR DISPLAY
	 */
	setListMovies,
	setMovie,
	setMovieDetail,

	// CUSTOM ACTIONS...
	setMovieIsInCartById,

	/**
	 * FOR SEARCH
	 */
	setSearchInput,
	setSearchPage,
	setMovieSearchQuery,
	setSearchByType,
} = movieSlice.actions;

export default movieSlice.reducer;
